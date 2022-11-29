FROM node:13

WORKDIR /usr/src/app

RUN npm install
COPY package*.json ./
COPY . /usr/src/app

EXPOSE 3310
CMD [ "node", "index.js" ]
