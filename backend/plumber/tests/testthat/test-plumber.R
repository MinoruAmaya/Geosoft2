# Automatisch erstelltes Test-Skript für die zu testende Plumber Datei (use_testthat(), use_test())
library(testthat)

# Dummy Test für einfache minmax Funktion, um package in RStudio auszuprobieren
test_that("minmax returns a vector of length 2", {
  expect_length(minmax(1:10), 2)
})

# Test für die Funktion, die die Klassifikation erstellt und die AOA berechnet
classification_and_aoa_test <- classification_and_aoa(xmin, xmax, ymin, ymax, type)
test_that("Classification and computation of AOA are correct", {
  expect_equal(classification_and_aoa_test, "The classification and computation of the AOA were successful")
})

# Test für die Funktion, die Geopackage in GeoJson umwandelt
geopackage_to_geojson_test <- geopackage_to_geojson("train_data", "database/input/")
test_that("The function converts the train data from gpkg to geojson correctly", {
  expect_equal(geopackage_to_geojson_test, "Successfully converted the data from GeoPackage to GeoJSON")
})

# Test für die Funktion, die das Modell trainiert
train_modell_test <- train_modell(rf)
test_that("Function trains the model correctly", {
  expect_equal(train_modell_test, "Successfully trained the model")
})

# Test für die Funktion, die das Satellitenbild anzeigt
show_satelliteimage_test <- show_satelliteimage()
test_that("Function displays the satellite image correctly", {
  expect_equal(geopackage_to_geojson_test, "Satellite image is displayed correctly")

})