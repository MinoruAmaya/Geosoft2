rm(list=ls())
library(mapview)
library(terra)
library(caret)
library('sf')
library('sp')
library('raster')

setwd("atlantGIS-app/public/data/demo")

# Einladen des Vektordatensatzes
Referenzdaten <- st_read("Classification.shp")

###############################################################################

# Working Directory ändern
setwd("atlantGIS-app/public/data/demo")

# Bolivien einladen
sentinel <- rast("L1C_T19KFV_A036129_20220523T144523.tif")

# Trainingsdaten auf die Bolivien Projektion umändern
Referenzdaten <- st_transform(Referenzdaten, crs(sentinel))

Referenzdaten$Area <- "PopoSee"

extr <- extract(sentinel, Referenzdaten)
head(extr)

Referenzdaten$PolyID <- 1:nrow(Referenzdaten)

extr <- merge(extr,Referenzdaten,by.x="ID",by.y="PolyID")
head(extr)

saveRDS(extr,file="trainData4.RDS")

predictors <- c("B02","B03","B04","B08","B05","B06","B07","B11","B12","B8A","NDVI","NDVI_3x3_sd","NDVI_5x5_sd")

TrainIDs <- createDataPartition(extr$ID,p=0.3,list=FALSE)
TrainDat <- extr[TrainIDs,]

TrainDat <- TrainDat[complete.cases(TrainDat[,predictors]),]
model <- train(TrainDat[,predictors],
               TrainDat$Label,
               method="rf",
               importance=TRUE,
               ntree=500) # 50 is quite small (default=500). But it runs faster.

saveRDS(model,file="RFModel2.RDS")

lvls <- list(levels(model$trainingData$.outcome))

prediction <- predict(as(sentinel,"Raster"),model)
prediction_terra <- as(prediction,"SpatRaster")

cols <- c( "lightgreen","blue", "green","darkred","forestgreen",
           "darkgreen","beige","darkblue"," firebrick1","red","yellow")
#spplot(deratify(prediction),col.regions=cols)
plot(prediction_terra,col=cols)

writeRaster(prediction_terra,"prediction2.grd",overwrite=TRUE)

pdf("LULC_PopoSee")
#spplot(deratify(prediction),maxpixels=ncell(prediction)*0.4,
#       col.regions=cols)
plot(prediction_terra,col=cols,maxcell=ncell(prediction_terra)*0.4)
dev.off()
