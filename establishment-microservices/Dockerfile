FROM node:lts-slim

WORKDIR /usr/app

COPY package*.json ./

RUN apt-get update

RUN apt-get install -y python3 make g++\
  && rm -rf /var/cache/apk/*

RUN apt-get install -y git openssl

RUN npm i --verbose

COPY . .

EXPOSE 3002
EXPOSE 9229
CMD [ "npm", "run", "build:docker:dev" ]