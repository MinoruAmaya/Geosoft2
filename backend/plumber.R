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

#* Echo the parameter that was sent in
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
classification_and_aoa <- function() {

    library(raster)
    
     # load all data required
     sentinel <- rast("database/input/rasterdaten.tif")
     model <- readRDS("database/output/model.RDS")
     
     prediction <- predict(as(sentinel, "Raster"), model)
     projection(prediction) <- "+proj=longlat +datum=WGS84 +no_defs +type=crs"
     prediction_terra <- as(prediction, "SpatRaster")

     # make it visualy more appealing
     cols <- c("lightgreen", "blue", "green", "darkred", "forestgreen",
               "darkgreen", "beige", "darkblue", " firebrick1", "red", "yellow")
     #plot(prediction_terra, col = cols)

     # save classification
     writeRaster(prediction_terra,
         "database/output/classification.tif", overwrite = TRUE)
     #plot(prediction_terra, col = cols)

      # Optional: to start parallel calculation
      #cl <- makeCluster(detectCores() - 1)
      #registerDoParallel(cl)
      # calculate AOA
      area_of_applicability <- aoa(sentinel, model)
      writeRaster(c(area_of_applicability$DI,area_of_applicability$AOA),
          "database/output/AOA.tif")
      #plot(area_of_applicability)
      #spplot(area_of_applicability$DI, col.regions=viridis(100),main="Dissimilarity Index")
      #plot predictions for the AOA only:
      #spplot(prediction, col.regions=viridis(100),main="prediction for the AOA")+
      #spplot(area_of_applicability$AOA,main="Area of Applicability")
  }

 # Farben für Visualisierung
 #cols_s <- c("lightgreen","blue","green","grey","chartreuse",
            #"forestgreen","beige","blue3","red","magenta","red")

 # Schöne Kartendarstellung
 ################################################################################

 #prediction[AreaOfApplicability$AOA == 0] <- NA

 #map <- tm_shape(deratify(pred_MR_OS),
   #              raster.downsample = FALSE) +
  #tm_raster(palette = cols_s,title = "LUC")+
   #tm_scale_bar(bg.color="white")+
   #tm_grid(n.x=4,n.y=4,projection="+proj=longlat
   # +ellps=WGS84 +datum=WGS84 +no_defs")+
   #tm_layout(legend.position = c("left","bottom"),
   #          legend.bg.color = "white",
   #          bg.color="black",

   #          legend.bg.alpha = 0.8)+
   #tm_add_legend(type = "fill",
 #                col="black",
 #                labels = "Outside AOA")
 #
 #map
 #
 #tmap_save(map, "filepath/AreaOfApplicability.png")


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
train_modell <- function(algorithm) {

     # loading satelliteimagery 
     sentinel <- rast("database/input/rasterdaten.tif")

     # loading reference data 
     referencedata <- read_sf("database/input/trainingsdaten.gpkg")

     # Trainingsdaten auf die Bolivien Projektion umändern
     referencedata <- st_transform(referencedata, crs(sentinel))

     extr <- extract(sentinel, referencedata)

     referencedata$PolyID <- 1:nrow(referencedata)

     extr <- merge(extr, referencedata, by.x = "ID", by.y = "PolyID")

     extr_subset <- extr[createDataPartition(extr$ID, p = 0.2)$Resample1, ]

     # creating all predictors from the satelliteimagery
     predictors <- c("B02", "B03", "B04", "B08", "B05", "B06", "B07", "B11",
                 "B12", "B8A")
     #predictors <- c("B02","B03","B04","B08","B05","B06","B07","B11",
     #           "B12","B8A","NDVI","NDVI_3x3_sd","NDVI_5x5_sd")

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