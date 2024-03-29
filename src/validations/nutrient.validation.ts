import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import StatusCode from '../constants/status'

export const createValidation = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const Schema = Joi.object({
		name: Joi.string().min(2)
			.required()
			.messages({
				'any.required': 'Name is required',
				'string.empty': 'Name must be at least 3 characters long',
				'string.min': 'Name must be at least 3 characters long',
			}),
		description: Joi.string().optional(),
		image: Joi.string().optional(),
		nutritional_info: Joi.array()
			.items({
				nutrient: Joi.string().alphanum()
					.required(),
				quantity: Joi.number().optional()
			})
			.required()
			.messages({}), // TODO: Validation error messages
		vegan: Joi.boolean().optional(),
		vegetarian: Joi.boolean().optional(),
		suitable_celiac: Joi.boolean().optional(),
	})

	const validation = Schema.validate(req.body)

	if (validation.error) {
		return res.status(StatusCode.BAD_REQUEST).json({
			data: validation.error,
			error: true,
		})
	}

	return next()
}

export const updateValidation = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const Schema = Joi.object({
		name: Joi.string().min(2)
			.optional()
			.messages({
				'string.empty': 'Name must be at least 3 characters long',
				'string.min': 'Name must be at least 3 characters long',
			}),
		description: Joi.string().optional(),
		image: Joi.string().optional(),
		nutritional_info: Joi.array()
			.items({
				nutrient: Joi.string().alphanum()
					.optional(),
				quantity: Joi.number().optional()
			})
			.optional()
			.messages({}), // TODO: Validation error messages
		vegan: Joi.boolean().optional(),
		vegetarian: Joi.boolean().optional(),
		suitable_celiac: Joi.boolean().optional(),
	})
	const validation = Schema.validate(req.body)

	if (validation.error) {
		return res.status(StatusCode.BAD_REQUEST).json({
			data: validation.error.message,
			error: true,
		})
	}

	return next()
}
