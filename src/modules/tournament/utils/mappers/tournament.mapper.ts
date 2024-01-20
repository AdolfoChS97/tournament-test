import { RewardsByRanking } from "../classes/tournament.classes";

export function createdTournament(tournamentId: string, accessPrice: number, rewardsByRanking: RewardsByRanking) {
    return { data: { tournamentId: tournamentId, accessPrice: accessPrice, rewardsByRanking: rewardsByRanking }, message: 'Tournament created successfully' };
}