import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DynamoDB } from "aws-sdk";
import { AttributeDefinition } from "aws-sdk/clients/dynamodb";

@Injectable()
export class DynamoDBService {

    private readonly dynamoClient = new DynamoDB({ region: 'local', endpoint: 'http://192.168.10.25:8000' });

    async listTables(): Promise<DynamoDB.ListTablesOutput> {
        try {
            return new Promise((resolve, reject) => {
                this.dynamoClient.listTables({}, (err, data) => {
                    if (err) reject(err);
                    return resolve(data);
                });
            })
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    async createTable(tableName: string, partitionKey: string, attributes: AttributeDefinition[], sortKey?:any ) {
        try {
            return new Promise((resolve, reject) => {
                this.dynamoClient.createTable({
                    TableName: tableName,
                    AttributeDefinitions: attributes,
                    KeySchema: [
                        {
                            AttributeName: partitionKey,
                            KeyType: 'HASH'
                        },
                        {
                            AttributeName: sortKey,
                            KeyType: 'RANGE'
                        }
                    ],
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 1,
                        WriteCapacityUnits: 1
                    }
                }, (err, data) => {
                    if(err) reject(err);
                    return resolve(data);
                })
            });
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    async getItem(tableName: string, key: any) {
        try {
            return new Promise((resolve, reject) => {
                this.dynamoClient.getItem({
                    TableName: tableName,
                    Key: key
                }, (err, data) => {
                    if(err) reject(err);
                    return resolve(data);
                })
            });
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    async insertItem(tableName: string, item: any) {
        try {
            return new Promise((resolve, reject) => {
                this.dynamoClient.putItem({
                    TableName: tableName,
                    Item: item
                }, (err, data) => {
                    if(err) reject(err);
                    return resolve(data);
                })
            });
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }


    // async create() {}
    // async addUser() {}
    // async start() {}
}