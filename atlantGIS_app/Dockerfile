FROM node:14


# Set the /app directory as working directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose app on a given port
EXPOSE 3000

# Start app
ENTRYPOINT  ["npm", "start"]

# See details here: https://github.com/mpolinowski/express-generator-dockerrized