FROM node:lts-slim
WORKDIR /usr/app

COPY package*.json ./

RUN apt-get update

RUN apt-get install -y python3 make g++\
  && rm -rf /var/cache/apk/*

RUN apt-get install -y git openssl

RUN npm i --verbose
RUN npm run prepareprisma:docker

COPY . .

EXPOSE 3001
CMD [ "npm", "run", "prod" ]