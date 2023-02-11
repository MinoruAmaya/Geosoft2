library(testthat)

test_that("minmax returns a vector of length 2", {
  expect_length(minmax(1:10), 2)
})

geopackage_to_geojson_test <- geopackage_to_geojson("train_data", "database/input/")
test_that("train_data.gpkg successful", {
  expect_equal(geopackage_to_geojson_test, "Successfully converted the training data from GeoPackage to GeoJSON")
})