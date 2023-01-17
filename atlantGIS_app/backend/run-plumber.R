#!/usr/bin/env Rscript

library(plumber)
pr("/plumber.R") %>%
  pr_run(port = 8000)
# Setting the host option on a VM instance ensures the application can be accessed externally.