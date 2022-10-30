FROM node:18.7.0-alpine3.15

EXPOSE 5173

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN mkdir -p node_modules/.vite && \
    chmod -R 777 node_modules/.vite&& \
    mkdir -p node_modules/.vite/deps_temp && \
    chmod -R 777 node_modules/.vite/deps_temp && \
    mkdir -p node_modules/.vite/deps && \
    chmod -R 777 node_modules/.vite/deps

COPY . .

CMD ["npm", "run", "dev"]
