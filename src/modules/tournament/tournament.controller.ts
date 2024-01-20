import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { TournamentService } from "./tournament.service";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  AddUserQueryParamsDto,
  CreateTournamentBodyDto,
  CreateTournamentQueryParamsDto,
  CreatedTournament,
  StartTournamentQueryParamsDto,
} from "./dto/create-tournament.dto";
import { JoiPipe } from "../../utils/pipes/joi.pipe";
import {
  createTournamentschema,
  startTournamentSchema,
  addUserSchema,
} from "./schema/tournament.schema";

@ApiTags("Tournaments")
@Controller("tournaments")
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  @ApiQuery({ name: "tournamentId", type: "string", required: true })
  @ApiQuery({ name: "accessPrice", type: "number", required: true })
  @ApiCreatedResponse({
    description: "Tournament created successfully",
    type: CreatedTournament,
  })
  @ApiBadRequestResponse({
    description: "Bad Request",
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", example: 400 },
        message: { type: "string", example: "Error description" },
        error: { type: "string", example: "Bad Request" },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: "Internal Server Error",
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", example: 500 },
        message: { type: "string", example: "Error description" },
        error: { type: "string", example: "Internal Server Error" },
      },
    },
  })
  async create(
    @Query() { tournamentId, accessPrice }: CreateTournamentQueryParamsDto,
    @Body(new JoiPipe(createTournamentschema))
    { rewardsByRanking }: CreateTournamentBodyDto,
    @Res() res,
  ) {
    try {
      return res
        .status(HttpStatus.CREATED)
        .json({
          ...(await this.tournamentService.create(
            tournamentId,
            +accessPrice,
            rewardsByRanking,
          )),
        });
    } catch (e) {
      throw e;
    }
  }

  @Post("/user")
  @ApiQuery({ name: "tournamentId", type: "string", required: true })
  @ApiQuery({ name: "mail", type: "string", required: true })
  @ApiOkResponse({
    description: 'User added successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            tournamentId: { type: 'string', example: 'abcdef' },
            mail: { type: 'string', example: 'admin@email.com' },
            accessPrice: { type: 'number', example: 100 },
            reward: { type: 'number', example: 1000 },
            rank: { type: 'number', example: 1 },
            SortKey: { type: 'number', example: 0 },
          },
        },
        message: { type: 'string', example: 'User added successfully' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: "Bad Request",
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", example: 400 },
        message: { type: "string", example: "Error description" },
        error: { type: "string", example: "Bad Request" },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: "Internal Server Error",
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", example: 500 },
        message: { type: "string", example: "Error description" },
        error: { type: "string", example: "Internal Server Error" },
      },
    },
  })
  async addUser(
    @Query(new JoiPipe(addUserSchema))
    { tournamentId, mail }: AddUserQueryParamsDto,
    @Res() res,
  ) {
    try {
      return res.status(HttpStatus.OK).json({ ... await this.tournamentService.addUser(tournamentId, mail) });
    } catch (e) {
      throw e;
    }
  }

  @Post("/start")
  start(
    @Query(new JoiPipe(startTournamentSchema))
    { tournamentId }: StartTournamentQueryParamsDto,
    @Res() res: Response,
  ) {
    try {
      return this.tournamentService.start(tournamentId);
    } catch (e) {
      throw e;
    }
  }
}
