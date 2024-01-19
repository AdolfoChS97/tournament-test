FROM node:18.1.0-alpine

COPY package*.json .

WORKDIR /app

RUN npm install

RUN npm install -g @nestjs/cli

EXPOSE 3000/tcp

CMD yarn start:dev