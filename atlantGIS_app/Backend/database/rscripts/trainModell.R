train_modell <- function(area, algorithm) {

    # loading all packages used
    library(terra)
    library(raster)
    library(caret)
    library(CAST)
    library(lattice)
    library(sf)

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