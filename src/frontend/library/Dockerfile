FROM node:18.7.0-alpine3.15

WORKDIR /usr/src/app

EXPOSE 5173

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

CMD [ "pnpm", "dev"]