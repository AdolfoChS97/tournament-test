import { BadRequestException, Injectable } from "@nestjs/common";
import { RewardsByRanking } from "./utils/classes/tournament.classes";
import { DynamoDBService } from "src/utils/services/dynamo.service";
import { addedUser, createdTournament } from "./utils/mappers/tournament.mapper";
import { CreatedTournament } from "./dto/create-tournament.dto";

@Injectable()
export class TournamentService {
  constructor(private readonly dynamoService: DynamoDBService) {}

  async create(
    tournamentId: string,
    accessPrice: number,
    rewardsByRanking: RewardsByRanking,
  ): Promise<CreatedTournament> {
    try {
      if (tournamentId === undefined && tournamentId !== "")
        throw new BadRequestException("Tournament ID is required");

      if (accessPrice === undefined)
        throw new BadRequestException("Access price is required");

      const tables = await this.dynamoService.listTables();

      if (!tables.TableNames?.includes("Tournaments")) {
        this.dynamoService.createTable(
          "Tournaments",
          "tournamentId",
          [
            { AttributeName: "tournamentId", AttributeType: "S" },
            { AttributeName: "SortKey", AttributeType: "N" },
            { AttributeName: "accessPrice", AttributeType: "N" },
            { AttributeName: "user", AttributeType: "S" },
            { AttributeName: "reward", AttributeType: "N" },
            { AttributeName: "rank", AttributeType: "N" },
          ],
          "SortKey",
        );
      }

      const { Item } = await this.dynamoService.getItem("Tournaments", {
        tournamentId: { S: tournamentId },
        SortKey: { N: "0" },
      });

      if (Item?.tournamentId?.S === tournamentId) {
        throw new BadRequestException("Tournament already exists");
      }

      await this.dynamoService.insertItem("Tournaments", {
        tournamentId: { S: tournamentId },
        SortKey: { N: "0" },
        accessPrice: { N: accessPrice.toString() },
        reward: { N: rewardsByRanking.reward.toString() },
        rank: { N: rewardsByRanking.rank.toString() },
      });

      return createdTournament(tournamentId, +accessPrice, rewardsByRanking);
    } catch (e) {
      throw e;
    }
  }

  async addUser(tournamentId: string, mail: string) {
    try {
      
      if(tournamentId === undefined && tournamentId !== "") throw new BadRequestException("Tournament ID is required")

      const { Item } = await this.dynamoService.getItem('Tournaments', {
        tournamentId: { S: tournamentId },
        SortKey: { N: "0" },
      })

      if(Item?.tournamentId?.S !== tournamentId) {
        throw new BadRequestException("Tournament does not exists")
      } 

      if(Item?.mail?.S === mail) {
        throw new BadRequestException("User already added to tournament")
      }

      await this.dynamoService.updateItem(tournamentId, mail);

      const record = await this.dynamoService.getItem('Tournaments', { 
        tournamentId: { S: tournamentId },
        SortKey: { N: "0" }, 
      });
      return addedUser(record);

    } catch (e) {
      throw e;
    }
  }

  async start(tournamentId: string) {}
}
