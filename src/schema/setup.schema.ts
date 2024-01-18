import * as Joi from 'joi';

export const setupSchema = Joi.object({
  APP_PORT: Joi.number().integer().default(3000).required().messages({
    'number.base': `PORT must be a number`,
    'number.integer': `PORT must be an integer`,
    'any.required': `PORT is required`,
  }),
  APP_ORIGIN: Joi.string().required().messages({
    'string.base': `ORIGIN must be a string`,
    'any.required': `ORIGIN is required`,
  }),
  APP_URL: Joi.string().required().messages({
    'string.base': `URL must be a string`,
    'any.required': `URL is required`,
  }),
});
