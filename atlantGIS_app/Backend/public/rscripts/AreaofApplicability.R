library(raster)
library(caret)
library(tmap)
library(CAST)
library(ggplot2)
library(latticeExtra)

# Optional: Um Rechenzeit zu erhöhen: Parallel-rechnung starten
library(doParallel) 
library(parallel)


# Working Directory setzen
setwd("filepath")


# Daten laden
################################################################################

# Sentinel einladen
sentinel <- stack("Marburg/FEML_2021/FEML_2021/Sentinel_Marburg.grd")

# Model einladen
trainedModel <- get(load("Modelloptimierung/ffsmodel.RData"))


# Eventuell Daten aggregieren (optional)
sentinel <- aggregate(sentinel,5) # Aggregieren um hier Rechenzeit zu mininmieren


# Predictions nochmal durchführen 
prediction <- predict(sentinel,trainedModel)


# Optional: Um Rechenzeit zu erhöhen: Parallel-rechnung starten
cl <- makeCluster(detectCores()-1)
registerDoParallel(cl)


# AOA Berechnungen (das dauert zum Teil etwas...)
AreaOfApplicability <- aoa(sentinel,trainedModel,cl=cl)
writeRaster(AreaOfApplicability,"filepath/AreaOfApplicability.grd")
plot(AreaOfApplicability$AOA)


# Farben für Visualisierung
cols_s <- c("lightgreen","blue","green","grey","chartreuse",
            "forestgreen","beige","blue3","red","magenta","red")



# Schöne Kartendarstellung
################################################################################

prediction[AreaOfApplicability$AOA == 0] <- NA

map <- tm_shape(deratify(pred_MR_OS),
                raster.downsample = FALSE) +
  tm_raster(palette = cols_s,title = "LUC")+
  tm_scale_bar(bg.color="white")+
  tm_grid(n.x=4,n.y=4,projection="+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs")+
  tm_layout(legend.position = c("left","bottom"),
            legend.bg.color = "white",
            bg.color="black",
            legend.bg.alpha = 0.8)+
  tm_add_legend(type = "fill",
                col="black",
                labels = "Outside AOA")

map

tmap_save(map, "filepath/AreaOfApplicability.png")

