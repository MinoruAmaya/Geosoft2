# Automatisch erstelltes Test-Skript für die zu testende Plumber Datei (use_testthat(), use_test())
library(testthat)

# Dummy Test für einfache minmax Funktion, um package in RStudio auszuprobieren
test_that("minmax returns a vector of length 2", {
  expect_length(minmax(1:10), 2)
})

# Test für die Funktion, die die Klassifikation erstellt und die AOA berechnet
test_that("Classification and computation of AOA are correct", {
  #expect_???
})


# Test für die Funktion, die Geopackage in GeoJson umwandelt
geopackage_to_geojson_test <- geopackage_to_geojson("train_data", "database/input/")
test_that("train_data.gpkg successful", {
  expect_equal(geopackage_to_geojson_test, "Successfully converted the training data from GeoPackage to GeoJSON")
})


# Test für die Funktion, die das Modell trainiert
test_that("Function trains the model correctly", {
  #expect_???
})


# Test für die Funktion, die das Satellitenbild anzeigt
test_that("Function displays the satellite image correctly", {
  #expect_???
})