FROM node:latest
RUN apt-get update && apt-get install -y \
    build-essential curl libcurl4-openssl-dev apt-utils libjq-dev systemctl\
    r-base r-base-dev libssl-dev libprotobuf-dev protobuf-compiler\
    libudunits2-dev libproj-dev libgdal-dev libgeos-dev libssl-dev libv8-dev\
    && rm -rf /var/lib/apt/lists/*
RUN apt install -y libprotobuf-dev protobuf-compiler
RUN apt-get upgrade


RUN R -e "install.packages('Rserve', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('caret', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('cast', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('randomForest', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('latticeExtra', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('gridExtra', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('viridis', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('ggplot2', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('geojson', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('rjson', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('raster', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('terra', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('tmap', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('CAST', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('dplyr', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN mkdir -p /usr/src/app
# Copy app code source from our local folder into the docker /app working directory


# Set the /app directory as working directory
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install




# Get all the code needed to run the app
COPY . .


# Expose app on a given port
EXPOSE 3000


CMD ["npm", "start"]
