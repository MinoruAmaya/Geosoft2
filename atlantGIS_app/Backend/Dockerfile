FROM rocker/r-base:latest
# Copy app code source from our local folder into the docker /app working directory
COPY . /app

# Set the /app directory as working directory
WORKDIR /app



RUN R -e "install.packages('Rserve', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('caret', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('cast', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('randomForest', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('latticeExtra', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('gridExtra', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('viridis', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('ggplot2', dependencies=TRUE, repos='http://cran.rstudio.com/')"



# Get all the code needed to run the app
COPY . .

# Expose app on a given port
EXPOSE 4000
<<<<<<< HEAD
=======


ENTRYPOINT ["tail", "-f", "/dev/null"]
>>>>>>> 90b7a972df788edd5d3eacb4eb1c959a49bc5bad
