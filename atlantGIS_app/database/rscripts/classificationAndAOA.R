classification_and_aoa <- function() {

    # load all packages used
    library(terra)
    library(raster)
    library(sf)
    library(sp)
    library(caret)
    library(tmap)
    library(CAST)
    library(ggplot2)
    library(latticeExtra)

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