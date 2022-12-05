trainModell <- function() {
    install.packages("caret")
    library(caret)
    trainData <- "./public/data/demo/Münster_Demo_Training.gpkg";
    predictors <- c("B02","B03","B04","B08","B05","B06","B07","B11",
                "B12","B8A","NDVI","NDVI_3x3_sd","NDVI_5x5_sd");
    model <- train(trainData[,predictors],
               trainData$Label,
               method="rf",
               importance=TRUE,
               ntree=500);
    return(model)
}