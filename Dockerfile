FROM arm64v8/node

WORKDIR /home/node/app
RUN chown -R node:node /home/node/app

COPY --chown=node:node package*.json ./

RUN apt-get update

RUN apt-get install -y python3 make g++\
  && rm -rf /var/cache/apk/*

RUN apt-get install -y git openssl

RUN npm i --verbose
COPY --chown=node:node . .

USER node

EXPOSE 3001

CMD [ "npm", "run", "dev2" ]