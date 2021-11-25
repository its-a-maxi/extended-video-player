# Use official node image as the base image
FROM node:latest

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Exposes backend port
EXPOSE 8000

# Starts the backend
CMD [ "npm", "start" ]
