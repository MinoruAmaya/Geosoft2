
FROM rocker/r-base:latest
# Copy app code source from our local folder into the docker /app working directory
COPY . /app

# Set the /app directory as working directory
WORKDIR /app



RUN mkdir -p /rscripts
COPY /rscripts/install_packages.R /rscripts/install_packages.R
RUN Rscript /rscripts/install_packages.R


# Get all the code needed to run the app
COPY . .


# Expose app on a given port
EXPOSE 4000


# Skript ausführen
CMD Rscript /rscripts/install_packages.R