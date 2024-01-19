import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { RewardsByRanking } from "../utils/classes/tournament.classes";

export class CreateTournamentQueryParamsDto {
  @ApiProperty({ example: 'abcdef', description: 'ID del torneo', required: true })
  tournamentId: string;
  
  @ApiProperty({ example: 100, description: 'Precio de acceso al torneo', required: true })
  accessPrice: number;  
}

export class CreateTournamentBodyDto {
  @ApiProperty({ type: RewardsByRanking, description: 'Recompensas por posición en el ranking', required: true })
  rewardsByRanking: RewardsByRanking; 
}

export class AddUserQueryParamsDto extends PartialType(OmitType(CreateTournamentQueryParamsDto, ['accessPrice'] as const), ){
  @ApiProperty({ example: 'admin@mail.com', description: 'Email del usuario a incluir', required: true })
  mail: string;
}

export class StartTournamentQueryParamsDto extends PartialType(OmitType(CreateTournamentQueryParamsDto, ['accessPrice'] as const), ) {}