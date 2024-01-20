import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { RewardsByRanking } from "../classes/tournament.classes";
import { DynamoDB } from "aws-sdk";

export function createdTournament(
  tournamentId: string,
  accessPrice: number,
  rewardsByRanking: RewardsByRanking,
) {
  return {
    data: {
      tournamentId: tournamentId,
      accessPrice: accessPrice,
      rewardsByRanking: rewardsByRanking,
    },
    message: "Tournament created successfully",
  };
}

export function addedUser(record: DynamoDB.GetItemOutput) {
  try {
    const { Item } = record;
    const data = {} ; 
    Object.keys(Item).forEach((key) => {
      data[key] = Item[key].S || Item[key].N;
    });
    
    return {
      data: data,
      message: "User added successfully",
    };
  } catch (e) {
    throw new InternalServerErrorException(e.message);
  }
}


// |   Item: {
//   tournament-test  |     reward: { N: '100' },
//   tournament-test  |     rank: { N: '1' },
//   tournament-test  |     SortKey: { N: '0' },
//   tournament-test  |     mail: { S: 'adolfo1997a@gmail.com' },
//   tournament-test  |     accessPrice: { N: '100' },
//   tournament-test  |     tournamentId: { S: 'abcdef' }
//   tournament-test  |   }