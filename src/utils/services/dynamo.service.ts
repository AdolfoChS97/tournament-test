import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DynamoDB } from "aws-sdk";
import { AttributeDefinition } from "aws-sdk/clients/dynamodb";


@Injectable()
export class DynamoDBService {

  private readonly dynamoClient;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.dynamoClient = new DynamoDB({
      region: this.configService.get<string>("DYNAMO_REGION"),
      endpoint: this.configService.get<string>("DYNAMO_ENDPOINT"),
    });
  }

  async listTables(): Promise<DynamoDB.ListTablesOutput> {
    try {
      return new Promise((resolve, reject) => {
        this.dynamoClient.listTables({}, (err, data) => {
          if (err) reject(err);
          return resolve(data);
        });
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async createTable(
    tableName: string,
    partitionKey: string,
    attributes: AttributeDefinition[],
    sortKey?: any,
  ) {
    try {
      return new Promise((resolve, reject) => {
        this.dynamoClient.createTable(
          {
            TableName: tableName,
            AttributeDefinitions: attributes,
            KeySchema: [
              {
                AttributeName: partitionKey,
                KeyType: "HASH",
              },
              {
                AttributeName: sortKey,
                KeyType: "RANGE",
              },
            ],
            ProvisionedThroughput: {
              ReadCapacityUnits: 1,
              WriteCapacityUnits: 1,
            },
          },
          (err, data) => {
            if (err) reject(err);
            return resolve(data);
          },
        );
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async getItem(tableName: string, key: any): Promise<DynamoDB.GetItemOutput> {
    try {
      return new Promise((resolve, reject) => {
        this.dynamoClient.getItem(
          {
            TableName: tableName,
            Key: key,
          },
          (err, data) => {
            if (err) reject(err);
            return resolve(data);
          },
        );
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async insertItem(
    tableName: string,
    item: any,
  ): Promise<DynamoDB.PutItemOutput> {
    try {
      return new Promise((resolve, reject) => {
        this.dynamoClient.putItem(
          {
            TableName: tableName,
            Item: item,
          },
          (err, data) => {
            if (err) reject(err);
            resolve(data);
          },
        );
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async scanTable(tableName: string): Promise<DynamoDB.ScanOutput> {
    try {
      return new Promise((resolve, reject) => {
        this.dynamoClient.scan(
          {
            TableName: tableName,
          },
          (err, data) => {
            if (err) reject(err);
            resolve(data);
          },
        );
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async updateItem(tournamentId: string, mail: string) {
    try {
      return new Promise((resolve, reject) => {
        this.dynamoClient.updateItem(
          {
            TableName: "Tournaments",
            Key: {
              tournamentId: { S: tournamentId },
              SortKey: { N: "0" },
            },
            UpdateExpression: "SET #mail = :mail",
            ExpressionAttributeNames: {
              "#mail": "mail",
            },
            ExpressionAttributeValues: {
              ":mail": { S: mail.toString() },
            },
          },
          (err, data) => {
            if (err) reject(err);
            resolve(data);
          },
        );
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }

  }
}
