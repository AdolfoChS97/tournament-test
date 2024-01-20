import * as joi from "joi";

export const createTournamentschema = joi.object({
  rewardsByRanking: joi
    .object({
      rank: joi.number().integer().required().messages({
        "number.base": `Rank must be a number`,
        "number.integer": `Rank must be an integer`,
        "any.required": `Rank is required`,
      }),
      reward: joi.number().required().messages({
        "number.base": `Reward must be a number`,
        "any.required": `Reward is required`,
      }),
    })
    .required()
    .messages({
      "object.base": `Rewards by ranking must be an object`,
      "any.required": `Rewards by ranking is required`,
    }),
});

export const addUserSchema = joi.object({
  mail: joi.string().email().required().messages({
    "string.base": `Mail must be a string`,
    "string.email": `Mail must be a valid email`,
    "any.required": `Mail is required`,
  }),
  tournamentId: joi.string().required().messages({
    "string.base": `Tournament ID must be a string`,
    "any.required": `Tournament ID is required`,
  }),
});

export const startTournamentSchema = joi.object({
  tournamentId: joi.string().required().messages({
    "string.base": `Tournament ID must be a string`,
    "any.required": `Tournament ID is required`,
  }),
});
