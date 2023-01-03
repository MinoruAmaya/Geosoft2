FROM node:14

RUN apt-get update && apt-get install -y \ 
    build-essential curl libcurl4-openssl-dev apt-utils libjq-dev \
    r-base r-base-dev libssl-dev libprotobuf-dev protobuf-compiler\
    libudunits2-dev libproj-dev libgdal-dev libgeos-dev libssl-dev libv8-dev\
    && rm -rf /var/lib/apt/lists/*
RUN apt install -y libprotobuf-dev protobuf-compiler
RUN apt-get upgrade

RUN R -e "install.packages('Rserve', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('cast', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('randomForest', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('latticeExtra', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('gridExtra', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('viridis', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('terra', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('sf', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('lattice', dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN R -e "install.packages('raster', dependencies=TRUE, repos='https://cran.uni-muenster.de/')"
RUN R -e "install.packages('grDevices', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('e1071', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('foreach', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('methods', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('ModelMetrics', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('nlme', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('plyr', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('pROC', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('recipes', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('reshape2', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('stats', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('stats4', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('utils', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('withr', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('BradleyTerry2', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('covr', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('Cubist', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('dplyr', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('earth', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('ellipse', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('fastICA', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('gam', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('ipred', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('kernlab', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('klaR', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('knitr', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('MASS', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('Matrix', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('mda', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('mgcv', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('mlbench', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('MLmetrics', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('nnet', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('pamr', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('party', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('pls', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('proxy', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('randomForest', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('RANN', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('rmarkdown', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('rpart', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('spls', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('subselect', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('superpc', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('testthat', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('themis', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
RUN R -e "install.packages('CAST', dependencies=TRUE, repos='http://cran.uni-muenster.de/')"
#RUN R -e "install.packages('ggplot2', dependencies=TRUE, repos='http://cran.rstudio.com/')"
#RUN R -e "install.packages('caret', dependencies=TRUE, repos='http://cran.rstudio.com/')"

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

# Start app vlt bin bash
ENTRYPOINT  ["npm", "start"]

# See details here: https://github.com/mpolinowski/express-generator-dockerrized