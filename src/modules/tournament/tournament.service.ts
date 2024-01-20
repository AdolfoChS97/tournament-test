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

            const tables = await this.dynamoService.listTables();
            
            if(!tables.TableNames?.includes('Tournaments')) {
                this.dynamoService.createTable(
                    'Tournaments', 
                    'tournamentId', [
                        { AttributeName: 'tournamentId', AttributeType: 'S' }, 
                        { AttributeName: 'SortKey', AttributeType: 'N' }, 
                        { AttributeName: 'accessPrice', AttributeType: 'N' }, 
                        { AttributeName: 'reward', AttributeType: 'N' },
                        { AttributeName: 'rank', AttributeType: 'N' }
                    ], 'SortKey');
            }

            console.log(await this.dynamoService.getItem('Tournaments', { tournamentId: { S: tournamentId }, SortKey: { N: '0' } }));

            await this.dynamoService.insertItem('Tournaments', {
                tournamentId: { S: tournamentId },
                SortKey: { N: '0' },
                accessPrice: { N: accessPrice.toString() },
                reward: { N: rewardsByRanking.reward.toString() },
                rank: { N: rewardsByRanking.rank.toString() }
            })

            return 1;

            // console.log(await this.dynamoService.createTable('Tournaments', 'tournamentId', [{ AttributeName: 'tournamentId', AttributeType: 'S' }, { AttributeName: 'SortKey', AttributeType: 'N' }], 'SortKey'));
            
        } catch (e) {
            throw e;
        }
    }

    async addUser(tournamentId: string, mail: string) {}

    async start(tournamentId: string) {}
}
