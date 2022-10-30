FROM node:18.7.0-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 1234

# ENV CALLBACK_URL 'http://sales:8080/callback'
# ENV CALLBACK_OBJECTS '{"prosemirror":"Text"}' 

CMD ["npm", "run", "start:dev"]
