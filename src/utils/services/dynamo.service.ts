import { Injectable } from "@nestjs/common";
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class DynamoDBService {

    private readonly dynamoClient = new DynamoDB({ region: 'local' ,endpoint: 'http://12.5.0.1:8001' });

    listTables() {
        console.log("exec");
        this.dynamoClient.listTables({}, (err, data) => {
            console.log('listTables');
            console.log(err);
            console.log(data);
        });
    }


    // async create() {}
    // async addUser() {}
    // async start() {}
}