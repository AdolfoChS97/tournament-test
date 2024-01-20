import { Module } from "@nestjs/common";
import { TournamentService } from "./tournament.service";
import { TournamentController } from "./tournament.controller";
import { DynamoDBService } from "src/utils/services/dynamo.service";

@Module({
  controllers: [TournamentController],
  providers: [TournamentService, DynamoDBService],
})
export class TournamentModule {}
