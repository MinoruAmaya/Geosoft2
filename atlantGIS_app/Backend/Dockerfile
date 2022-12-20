FROM node:14

RUN apt-get update && apt-get install -y \ 
    build-essential curl libcurl4-openssl-dev apt-utils libjq-dev \
    r-base r-base-dev libssl-dev libprotobuf-dev protobuf-compiler\
    libudunits2-dev libproj-dev libgdal-dev libgeos-dev libssl-dev libv8-dev\
    && rm -rf /var/lib/apt/lists/*
RUN apt install -y libprotobuf-dev protobuf-compiler
RUN apt-get upgrade

RUN R -e "install.packages('Rserve', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('caret', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('cast', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('randomForest', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('latticeExtra', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('gridExtra', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('viridis', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('ggplot2', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('terra', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('sf', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('lattice', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('raster', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package.json /app

# Install app dependencies
RUN npm install

COPY . /app

# Expose app on a given port
EXPOSE 4000

# Start app
ENTRYPOINT  ["npm", "start"]

# See details here: https://github.com/mpolinowski/express-generator-dockerrized