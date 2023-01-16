FROM rstudio/plumber

RUN apt-get update -qq && apt-get install -y libcurl4-openssl-dev \ 
    libproj-dev \ libv8-dev \libssl-dev \ libjq-dev \ libprotobuf-dev \ 
    protobuf-compiler \ make \ libgeos-dev \ libudunits2-dev \ libgdal-dev \ gdal-bin
    



RUN R -e "install.packages('CAST', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('caret', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('sp', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('ggplot2', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('lattice', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('Rserve', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('latticeExtra', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('randomForest', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('gridExtra', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('viridisLite', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('viridis', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('geojson', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('rjson', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('raster', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('terra', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"

# Set working directory
WORKDIR /usr/src/app

# Get all the code needed to run the app
COPY . /plumber/

# Expose app on a given port
EXPOSE 4000


CMD ["plumber.R"]