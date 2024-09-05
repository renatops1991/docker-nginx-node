FROM node:latest AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./app ./app

RUN rm -rf node_modules

RUN apt-get update && \
    npm install

FROM node:22.8.0-alpine

WORKDIR /usr/src

COPY --from=builder /usr/src/app .

EXPOSE 3000

CMD ["node", "app/index.js"]
