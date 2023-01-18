library(plumber)
library(rjson)
library(geojsonio)
library(geojson)
library(geojsonsf)
library(RCurl)
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
library(tmap)
library(CAST)
library(latticeExtra)

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
#* @serializer png
classification_and_aoa <- function() {


    # load all data required
    sentinel <- stack("Pfad einsetzten")
    trained_model <- get(load("./data/model/rf_model.RDS"))

    # Eventuell Daten aggregieren (optional)
    #sentinel <- aggregate(sentinel,5) # aggreagteto minimize time

    # calculate the classification
    prediction <- predict(as(sentinel, "Raster"), trained_model)
    prediction_terra <- as(prediction, "SpatRaster")

    # make it visualy more appealing
    cols <- c("lightgreen", "blue", "green", "darkred", "forestgreen",
              "darkgreen", "beige", "darkblue", " firebrick1", "red", "yellow")
    plot(prediction_terra, col = cols)

    # save classification
    writeRaster(prediction_terra,
        "./data/output/classification.tif", overwrite = TRUE)

    # Optional: to start parallel calculation
    cl <- makeCluster(detectCores() - 1)
    registerDoParallel(cl)

    # calculate AOA
    area_of_applicability <- aoa(sentinel, trained_model, cl = cl)
    writeRaster(area_of_applicability,
        "./data/output/area_of_applicability.tif")
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
#* @param parameter
#* @get /gpkgToGeojson
#* @serializer png
geopackage_to_geojson <- function(filepath, filename) {

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
#* @serializer png
train_modell <- function(area, algorithm) {


    # loading satelliteimagery 
    sentinel <- rast("./data/satteliteimagery/processed_satelliteimage.tif")

    # loading reference data 
    referencedata <- read_sf("./data/trainingData/train_data.gpkg")

    # Trainingsdaten auf die Bolivien Projektion umändern
    referencedata <- st_transform(referencedata, crs(sentinel))

    referencedata$Area <- area

    extr <- extract(sentinel, referencedata)

    referencedata$PolyID <- 1:nrow(referencedata)

    extr <- merge(extr, referencedata, by.x = "ID", by.y = "PolyID")

    # creating all predictors from the satelliteimagery
    predictors <- c("B02", "B03", "B04", "B08", "B05", "B06", "B07", "B11",
                "B12", "B8A")
    #predictors <- c("B02","B03","B04","B08","B05","B06","B07","B11",
    #           "B12","B8A","NDVI","NDVI_3x3_sd","NDVI_5x5_sd")

    train_ids <- createDataPartition(extr$ID, p = 0.3, list = FALSE)
    train_data <- extr[train_ids, ]

    train_data <- train_data[complete.cases(train_data[, predictors]), ]

    # training the model
    model <- train(train_data[, predictors],
               train_data$Label,
               method = algorithm,
               importance = TRUE,
               ntree = 500)

    # save the model
    saveRDS(model, file = "./data/model/rf_model.RDS", overwrite = TRUE)

    # return
    return(0)
}




#* function for sentinel
#* @param parameter
#* @get /vorbereitung
#* @serializer png
setwd("atlantGIS-app/public/data/demo/L1C_T19KFV_A036129_20220523T144523.tif")

################################################################################

################################################################################

# Stack für 10m und 20m einladen

senstack_10 <- rast(c("R10m/T32UNF_20220812T103031_B02_10m.jp2",
                      "R10m/T32UNF_20220812T103031_B03_10m.jp2",
                      "R10m/T32UNF_20220812T103031_B04_10m.jp2",
                      "R10m/T32UNF_20220812T103031_B08_10m.jp2"))

senstack_20 <- rast(c("R20m/T32UNF_20220812T103031_B05_20m.jp2",
                      "R20m/T32UNF_20220812T103031_B06_20m.jp2",
                      "R20m/T32UNF_20220812T103031_B07_20m.jp2",
                      "R20m/T32UNF_20220812T103031_B11_20m.jp2",
                      "R20m/T32UNF_20220812T103031_B12_20m.jp2",
                      "R20m/T32UNF_20220812T103031_B8A_20m.jp2"))
plot(senstack_10)

# Croppen
senstack_10 <- crop(senstack_10,c(565000, 585000, 6010000,6033000))
senstack_20 <- crop(senstack_20,c(565000, 585000, 6010000,6033000))
plotRGB(senstack_10,b=1,g=2,r=3,stretch="lin")

# Umwandeln von 20m auf 10m
senstack_20_res <- resample(senstack_20,senstack_10)
senstack_all <- rast(list(senstack_10,senstack_20_res))

# Namen anpassen
names(senstack_all) 
names(senstack_all) <- substr(names(senstack_all),
                              nchar(names(senstack_all))-6, # von der 6-letzten Stelle...
                              nchar(names(senstack_all))-4) #bis zur 4-letzten

names(senstack_all)
plot(senstack_all)

senstack_all <- crop(senstack_all, c(565000, 585000, 6010000,6033000))

# Raster rausschreiben, WD anpassen!!!
writeRaster(senstack_all,
            "L1C_T19KFV_A036129_20220523T144523.tif",
            overwrite=T)

###############################################################################

# Working Directory setzen

setwd("Passendes WD finden")

# Raster einladen

combined <- rast("L1C_T19KFV_A036129_20220523T144523.tif")


################################################################################

#NDVI hinzufügen

combined$NDVI <- (combined$B08-combined$B04)/(combined$B08+combined$B04)
plot(combined$NDVI)


################################################################################

# NDVI Maske

combined$NDVI_3x3_sd <- focal(combined$NDVI,w=matrix(1,3,3), fun=sd)
combined$NDVI_5x5_sd <- focal(combined$NDVI,w=matrix(1,5,5), fun=sd)
plot(rast(list(combined$NDVI_3x3_sd,combined$NDVI_5x5_sd)))


################################################################################

# Koordinaten hinzufügen

template <- combined$B02 # Kopie erstellen
template_ll <- project(template,"+proj=longlat +datum=WGS84 +no_defs") #in Latlong umprojizieren
coords <- crds(template_ll,na.rm=FALSE) # Koordinaten für jedes Pixel als tabelle bekommen
lat <- template_ll # Kopie erstellen
lon <- template_ll# Kopie erstellen
values(lat) <- coords[,2] # Koordinaten auf das Raster schreiben
values(lon) <- coords[,1] # Koordinaten auf das Raster schreiben
coords <- rast(list(lat,lon)) # neuen Steck erstellen
names(coords) <- c("lat","lon") #...und benennen
coords <- project(coords,crs(combined)) # wieder in Projektion des Combined stacks bringen
coords <- resample(coords,combined) # und auf die gleiche Geometrie
#plot(coords)
combined <- rast(list(combined,coords)) # alles zusammenführen
plot(combined$lon)
plot(combined$lat)
names(combined)
################################################################################

# Raster rausschreiben

writeRaster(combined,
            "MeinSatellitenbild.tif",
            overwrite=TRUE)
