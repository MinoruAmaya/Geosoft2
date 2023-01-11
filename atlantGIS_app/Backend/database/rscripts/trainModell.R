library(terra)
train_data <- rast("./database/data/demo/Münster_Demo_Training.gpkg") # add the correct path here
predictors <- c("B02", "B03", "B04", "B08", "B05", "B06", "B07", "B11",
            "B12", "B8A") # maybe we need to change these names
model <- train(train_data[, predictors],
           train_data$Label,
           method = "rf",
           importance = TRUE,
           ntree = 500)
saveRDS(model, file = "./database/data/demo/RFModel.RDS")