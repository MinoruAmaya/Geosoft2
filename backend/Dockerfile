FROM rstudio/plumber

# Set working directory
WORKDIR /usr/src/app

RUN apt-get update -qq && apt-get install -y libcurl4-openssl-dev \
    libssl-dev \ 
    libjq-dev \ 
    libprotobuf-dev \ 
    protobuf-compiler \
    make \ 
    libgeos-dev \ 
    libudunits2-dev \ 
    libgdal-dev \ 
    gdal-bin \
    libproj-dev \ 
    libv8-dev
    
# Install r packages
# RUN R -e "install.packages('CAST', dependencies=TRUE)"
# RUN R -e "install.packages('caret', dependencies=TRUE)"
# RUN R -e "install.packages('sp', dependencies=TRUE)"
# RUN R -e "install.packages('ggplot2', dependencies=TRUE)"
# RUN R -e "install.packages('lattice', dependencies=TRUE)"
# RUN R -e "install.packages('Rserve', dependencies=TRUE)"
# RUN R -e "install.packages('latticeExtra', dependencies=TRUE)"
# RUN R -e "install.packages('randomForest', dependencies=TRUE)"
# RUN R -e "install.packages('gridExtra', dependencies=TRUE)"
# RUN R -e "install.packages('viridisLite', dependencies=TRUE)"
# RUN R -e "install.packages('viridis', dependencies=TRUE)"
# RUN R -e "install.packages('geojson', dependencies=TRUE)"
# RUN R -e "install.packages('rjson', dependencies=TRUE)"
# RUN R -e "install.packages('raster', dependencies=TRUE)"
# RUN R -e "install.packages('terra', dependencies=TRUE)"

COPY ./backend/plumber.R ./

# Expose app on a given port
EXPOSE 8000

# Execute plumber.R
CMD ["plumber.R"]