FROM node:alpine3.10

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

RUN mkdir -p /src/app

COPY ./app /src/app

WORKDIR /src/app

RUN npm install

CMD ["node", "server.js"]
