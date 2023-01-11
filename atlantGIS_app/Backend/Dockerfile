FROM node:latest

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
RUN add-apt-repository 'deb https://cloud.r-project.org/bin/linux/*ubuntu UNSERE UBUNTU VERSION/*'
RUN apt update -q && DEBIAN_FRONTEND=noninteractive apt install -q -y r-base


RUN apt-get update && apt-get install -y \
    build-essential curl libcurl4-openssl-dev apt-utils libjq-dev systemctl\
    r-base-dev libssl-dev libprotobuf-dev protobuf-compiler\
    libudunits2-dev libproj-dev libgdal-dev libgeos-dev libssl-dev libv8-dev\
    && rm -rf /var/lib/apt/lists/*
RUN apt install -y libprotobuf-dev protobuf-compiler
RUN apt-get upgrade


RUN R -e "install.packages('caret', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('cast', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('sp', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('Rserve', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('ggplot2', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('lattice', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('latticeExtra', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('randomForest', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('gridExtra', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('viridisLite', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('viridis', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('geojson', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('rjson', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('raster', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('terra', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"

RUN mkdir -p /usr/src/app
# Copy app code source from our local folder into the docker /app working directory

# Get all the code needed to run the app
COPY . /app

# Set the /app directory as working directory
WORKDIR /app

# Install app dependencies
RUN npm install

# Expose app on a given port
EXPOSE 4000


# Start app
ENTRYPOINT  ["npm", "start"]
