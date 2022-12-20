library(caret)
library(terra)
train_data <- rast("./public/data/demo/Münster_Demo_Training.gpkg");
predictors <- c("B02","B03","B04","B08","B05","B06","B07","B11",
            "B12","B8A")
model <- train(train_data[,predictors],
           train_data$Label,
           method = "rf",
           importance = TRUE,
           ntree = 500)
return(model)