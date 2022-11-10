# Pull official base image
# FROM node:13.12.0-alpine
FROM node:16.17.0-bullseye-slim

# Set working directory
WORKDIR /webclient-admin

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /webclient-admin/node_modules/.bin:$PATH

# Install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# Add app
COPY . ./

# Expose port
EXPOSE 3002

# Start app
CMD ["npm", "start"]