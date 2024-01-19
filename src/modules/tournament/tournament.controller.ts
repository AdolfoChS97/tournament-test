import { Body, Controller, Post, Query, Res, UsePipes } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddUserQueryParamsDto, CreateTournamentBodyDto, CreateTournamentQueryParamsDto, StartTournamentQueryParamsDto } from './dto/create-tournament.dto';
import { JoiPipe } from '../../utils/pipes/joi.pipe'
import { createTournamentschema, startTournamentSchema, addUserSchema } from './schema/tournament.schema';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  @ApiQuery({ name: 'tournamentId', type: 'string', required: true })
  @ApiQuery({ name: 'accessPrice', type: 'number', required: true })
  create(
    @Query() { tournamentId, accessPrice }: CreateTournamentQueryParamsDto,
    @Body(new JoiPipe(createTournamentschema)) { rewardsByRanking }: CreateTournamentBodyDto,
    @Res() res: Response,
  ) {
    try {
      return this.tournamentService.create(tournamentId, +accessPrice, rewardsByRanking);
    } catch (e) {
      throw e;
    }
  }

  @Post('/user') 
  @ApiQuery({ name: 'tournamentId', type: 'string', required: true })
  @ApiQuery({ name: 'mail', type: 'string', required: true })
  addUser(
    @Query(new JoiPipe(addUserSchema)) { tournamentId, mail }: AddUserQueryParamsDto,
    @Res() res: Response,
  ) {
    try {
      return this.tournamentService.addUser(tournamentId, mail);
    } catch (e) {
      throw e;
    }
  }

  @Post('/start')
  start(
    @Query(new JoiPipe(startTournamentSchema)) { tournamentId }: StartTournamentQueryParamsDto,
    @Res() res: Response,
  ) {
    try {
      return this.tournamentService.start(tournamentId);
    } catch (e) {
      throw e;
    }
  }
}