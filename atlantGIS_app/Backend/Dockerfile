FROM node:14


# Copy app code source from our local folder into the docker /app working directory
COPY . /app

# Set the /app directory as working directory
WORKDIR /app


FROM rocker/r-base:latest
RUN mkdir -p /rscripts
COPY /rscripts/install_packages.R /rscripts/install_packages.R
RUN Rscript /rscripts/install_packages.R
RUN chown -R node /app/node_modules

# Get all the code needed to run the app
COPY . .

# Install app dependencies
RUN npm install

# Expose app on a given port
EXPOSE 8080

# Serve the app
ENTRYPOINT ["npm", "start"]

# Skript ausführen
CMD Rscript /rscripts/install_packages.R