FROM node:13

WORKDIR /usr/src/app

RUN npm install
COPY package*.json ./
COPY . /usr/src/app

EXPOSE 3000
CMD [ "node", "index.js" ]
