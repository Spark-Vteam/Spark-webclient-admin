# Pull official base image
# FROM node:13.12.0-alpine
FROM node:13.12.0-alpine as builder

# Set working directory
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
