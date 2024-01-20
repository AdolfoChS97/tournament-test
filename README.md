# NestJS - DynamoDB Local POC  

## Description
This project is a POC to test the integration between NestJS and DynamoDB Local. This project is a simple integrations where we'll notice how to create a DynamoDB table and how can we insert data on it. 

## How to use
To use this project you need to have installed the following tools:
- Docker


You can define the environment variables in the file .env that you can find in the root of the server folder. If you don't know which value you need to set in the environment variables, you can check the file .env.example.

you should create a .env file in server folder with the following variables:

``` bash
APP_PORT=3000
APP_ORIGIN=*
APP_URL=http://localhost
---------------------------------------
DYNAMO_REGION=local
DYNAMO_ENDPOINT=http://192.168.10.25:8000
``` 

Once you have defined the environment variables, you can run the project with the following command:
```bash
docker-compose build
```

This will allow you create a docker image with the project. Once you have the image, you can run the project with the following command:
```bash
docker-compose up
```

Once you have the project running, you can access to the web page in the following url: http://localhost:3000 or http://localhost:3000/docs to see the swagger documentation.

