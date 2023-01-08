# R Scripts, um Daten im Geopackage-Format in GeoJson umzuwandeln
library(sf)
library(geojson)
library(geojsonsf)
train_data_sf <- read_sf(paste(filepath,
    paste(filename, ".gpkg", sep = ""), sep = ""))
train_data_sf_4326 <- st_transform(trainData_sf, crs = st_crs("EPSG:4326"))
train_data_geojson <- sf_geojson(trainData_sf_4326)
geo_write(train_data_geojson, paste(filepath,
    paste(filename, ".geojson", sep = ""), sep = ""))