import { ApiProperty } from "@nestjs/swagger";

export class RewardsByRanking { 
    @ApiProperty({ example: 1, description: 'Posición en el ranking', required: true })
    rank: number;
    @ApiProperty({ example: 100, description: 'Recompensa por la posición en el ranking', required: true })
    reward: number;
}