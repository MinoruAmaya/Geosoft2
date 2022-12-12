library(raster)
library(caret)
library(tmap)
library(CAST)

# Working Directory setzen
setwd("C:/Users/Derya/OneDrive/Desktop/UNI/Semester/FEML/Osnabrück")


# Daten laden
################################################################################
# labeltab <- read.csv("Gesamtdatensatz/Landnutzungsklassen.csv")

# Sentinel einladen
marburg_sen <- stack("Marburg/FEML_2021/FEML_2021/Sentinel_Marburg.grd")

# Model einladen
model_osnabrueck <- get(load("Modelloptimierung/ffsmodel.RData"))


# Eventuell Daten aggregieren (optional)

marburg_sen <- aggregate(marburg_sen,5) # Aggregieren um hier Rechenzeit zu mininmieren


# Predictions nochmal durchführen 

pred_MR_OS <- predict(marburg_sen,model_osnabrueck)


# AOA Berechnungen (das dauert zum Teil etwas...)

# Optionel: Um Rechenzeit zu erhöhen: Parallel-rechnung starten
library(doParallel) 
library(parallel)
cl <- makeCluster(detectCores()-1)
registerDoParallel(cl)

AOA_MR_OS <- aoa(marburg_sen,model_osnabrueck,cl=cl)
writeRaster(AOA_MR_OS,"AreaOfApplicability/AOA_MR_OS.grd")
plot(AOA_MR_OS$AOA)


# Farben für Visualisierung
cols_s <- c("lightgreen","blue","green","grey","chartreuse",
            "forestgreen","beige","blue3","red","magenta","red")


library(ggplot2)
library(latticeExtra)


# Schöne Kartendarstellung
################################################################################

pred_MR_OS[AOA_MR_OS$AOA == 0] <- NA

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

tmap_save(map, "AreaOfApplicability/AOA_MR_OS.png")

