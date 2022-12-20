FROM node:14

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
# install and app dependencies
COPY package.json /app/package.json

# Install app dependencies
RUN npm install

COPY . /app

# Expose app on a given port
EXPOSE 3000

# Start app
ENTRYPOINT  ["npm", "start"]

# See details here: https://github.com/mpolinowski/express-generator-dockerrized