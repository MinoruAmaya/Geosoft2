FROM node:14


# Copy app code source from our local folder into the docker /app working directory
COPY . /app

# Set the /app directory as working directory
WORKDIR /app

#RUN apt-get update && apt-get install -y \
 #   build-essential curl libcurl4-openssl-dev apt-utils libjq-dev systemctl\
  #  r-base r-base-dev libssl-dev libprotobuf-dev protobuf-compiler\
   # libudunits2-dev libproj-dev libgdal-dev libgeos-dev libssl-dev libv8-dev\
    #&& rm -rf /var/lib/apt/lists/*
#RUN apt install -y libprotobuf-dev protobuf-compiler
#RUN apt-get upgrade

RUN pull rocker/r-base
RUN -it --rm rocker/r-base
RUN /rscrpits/install_packages.R

# Get all the code needed to run the app
COPY . .


# Expose the port the app runs in
EXPOSE 8080

# Serve the app
CMD ["npm", "start"]