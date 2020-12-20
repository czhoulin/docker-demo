FROM node:alpine3.10

RUN mkdir -p /src/app

COPY ./app /src/app

WORKDIR /src/app

RUN npm install

CMD ["node", "server.js"]
