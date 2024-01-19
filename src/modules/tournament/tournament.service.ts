import { BadRequestException, Injectable } from '@nestjs/common';
import { RewardsByRanking } from './utils/classes/tournament.classes';
import { DynamoDBService } from 'src/utils/services/dynamo.service';

@Injectable()
export class TournamentService {

    constructor( private readonly dynamoService: DynamoDBService ) {}

    async create(tournamentId: string, accessPrice: number, rewardsByRanking: RewardsByRanking) {
        try {
            if(tournamentId === undefined && tournamentId !== '') 
                throw new BadRequestException('Tournament ID is required');
            
            if(accessPrice === undefined)
                throw new BadRequestException('Access price is required');
        
            this.dynamoService.listTables();
            
        } catch (e) {
            throw e;
        }
    }

    async addUser(tournamentId: string, mail: string) {}

    async start(tournamentId: string) {}
}
