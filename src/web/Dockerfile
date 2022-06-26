FROM node:17.5.0-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]