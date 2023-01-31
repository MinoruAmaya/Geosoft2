library(plumber)
library(rjson)
library(geojson)
library(geojsonsf)
library(ggplot2)
library(dplyr)
library(lubridate)
library(hms)
library(terra)
library(mapview)
library(raster)
library(sf)
library(sp)
library(caret)
library(CAST)
library(latticeExtra)
library(viridis)

#* @apiTitle AtlantGIS
#* @apiDescription Backend für die AtlantGIS_app

# plumber.R

#* Funktion, um später die R Skripts zu testen
#* @param msg The message to echo back.
#* @get /echo
function(msg=""){
  list(msg = paste0("The message is: '", msg, "'"))
}

#* Plot out data from the iris dataset
#* @param spec If provided, filter the data to only this species (e.g. 'setosa')
#* @get /plot
#* @serializer png
function(spec){
  myData <- iris
  title <- "All Species"

  # Filter if the species was specified
  if (!missing(spec)){
    title <- paste0("Only the '", spec, "' Species")
    myData <- subset(iris, Species == spec)
  }

  plot(myData$Sepal.Length, myData$Petal.Length,
       main=title, xlab="Sepal Length", ylab="Petal Length")
}

#* function for classification and aoa
#* @param parameter
#* @get /classificationAoa
classification_and_aoa <- function(xmin, xmax, ymin, ymax, type) {

    library(raster)
    library(terra)
    library(rgdal)
    
     # load all data required
     if(type == "demo"){
      sentinel <- rast("database/input/satellitenimage_demo.tif")
      model <- readRDS("database/output/model_demo.RDS")
     }
     else{
      sentinel <- rast("database/input/satelliteimage.tif")
      model <- readRDS("database/output/model.RDS")
      if(type == "second"){
        aoa_alt <- rast("database/output/AOA.tif")
      }
     }
     
     mask <- c(xmin,  xmax, ymin, ymax)
     class(mask) <- "numeric"
     sentinel <- crop(sentinel, ext(mask))

     prediction <- predict(as(sentinel, "Raster"), model)
     #projection(prediction) <- "+proj=longlat +datum=WGS84 +no_defs +type=crs"
     prediction_terra <- as(prediction, "SpatRaster")

     # make it visualy more appealing
     cols <- c("lightgreen", "blue", "green", "darkred", "forestgreen",
               "darkgreen", "beige", "darkblue", " firebrick1", "red", "yellow")
     #plot(prediction_terra, col = cols)

     # save classification
     writeRaster(prediction_terra,
         "database/output/classification.tif", overwrite = TRUE)
     plot(prediction_terra, col = cols)


      if(type == "second"){
        # calculate AOA
        area_of_applicability <- aoa(sentinel, model)
        writeRaster(c(area_of_applicability$AOA),
            "database/output/AOA.tif", overwrite = TRUE)
        dataRecom <- selectHighest(area_of_applicability$DI, 2000)
        #dataRecom[is.nan(dataRecom)] <- 0
        crs(dataRecom) <- "+proj=longlat +datum=WGS84 +no_defs +type=crs"
        dataRecomVec <- as.polygons(dataRecom)
        crs(dataRecomVec) <- "+proj=longlat +datum=WGS84 +no_defs +type=crs"
        terra::writeVector(dataRecomVec,
            "database/output/DI.geojson", filetype="geojson" , overwrite = TRUE)
        
        aoa_vergleich <- aoa - area_of_applicability$AOA
        crs(aoa_vergleich) <- "+proj=longlat +datum=WGS84 +no_defs +type=crs"
        writeRaster(c(aoa_vergleich),
            "database/output/AOA_Vergleich.tif", overwrite = TRUE)
      }
      else{
        # calculate AOA
        area_of_applicability <- aoa(sentinel, model)
        writeRaster(c(area_of_applicability$AOA),
            "database/output/AOA.tif", overwrite = TRUE)
        dataRecom <- selectHighest(area_of_applicability$DI, 2000)
        #dataRecom[is.nan(dataRecom)] <- 0
        #crs(dataRecom) <- "+proj=longlat +datum=WGS84 +no_defs +type=crs"
        dataRecomVec <- as.polygons(dataRecom)
        #crs(dataRecomVec) <- "+proj=longlat +datum=WGS84 +no_defs +type=crs"
        terra::writeVector(dataRecomVec,
            "database/output/DI.geojson", filetype="geojson" , overwrite = TRUE)
      }
  }

#* function for converting a gpkg to geojson
#* @get /gpkgToGeojson
#* @serializer json
geopackage_to_geojson <- function() {
    filepath <- "database/input/"
    filename <- "train_data"
    train_data_sf <- read_sf(paste(filepath,
        paste(filename, ".gpkg", sep = ""), sep = ""))
    train_data_sf_4326 <- st_transform(train_data_sf, crs = st_crs("EPSG:4326"))
    train_data_geojson <- sf_geojson(train_data_sf_4326)
     geo_write(train_data_geojson, paste(filepath,
         paste(filename, ".geojson", sep = ""), sep = ""))
 }



#* function for training the model
#* @param parameter
#* @get /trainModell
train_modell <- function(algorithm, type) {

     if(type == "demo"){
      # loading satelliteimagery 
      sentinel <- rast("database/input/satellitenimage_demo.tif")
 
      # loading reference data 
      referencedata <- read_sf("database/input/train_data_demo.gpkg")
     }
     else{
      # loading satelliteimagery 
      sentinel <- rast("database/input/satelliteimage.tif")
 
      # loading reference data 
      referencedata <- read_sf("database/input/train_data.geojson")
     }

     # Trainingsdaten auf die Bolivien Projektion umändern
     referencedata <- st_transform(referencedata, crs(sentinel))

     extr <- extract(sentinel, referencedata)

     referencedata$PolyID <- 1:nrow(referencedata)

     extr <- merge(extr, referencedata, by.x = "ID", by.y = "PolyID")

     extr_subset <- extr[createDataPartition(extr$ID, p = 0.2)$Resample1, ]

     # creating all predictors from the satelliteimagery
     predictors <- c("B02", "B03", "B04", "B08", "B05", "B06", "B07", "B11",
                 "B12", "B8A")

     train_ids <- createDataPartition(extr$ID, p = 0.1, list = FALSE)
     train_data <- extr[train_ids, ]

     train_data <- train_data[complete.cases(train_data[, predictors]), ]

     # training the model
     model <- train(train_data[, predictors],
                train_data$Label,
                method = algorithm,
                importance = TRUE,
                ntree = 50)

     # save the model
     saveRDS(model, file = "database/output/model.RDS")
}
