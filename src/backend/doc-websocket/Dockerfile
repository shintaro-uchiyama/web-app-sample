FROM node:18.7.0-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 1234

CMD ["npm", "run", "start:dev"]
