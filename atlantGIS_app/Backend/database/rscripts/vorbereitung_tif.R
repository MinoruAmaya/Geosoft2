library(terra)
library(mapview)

################################################################################

# Working Directory setzen

# ANPASSEN:

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