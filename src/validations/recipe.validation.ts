import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import StatusCode from '../constants/status'

export const createValidation = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const Schema = Joi.object({
		name: Joi
			.string()
			.min(2)
			.required()
			.messages({
				'any.required': 'Name is required',
				'string.empty': 'Name must be at least 3 characters long',
				'string.min': 'Name must be at least 3 characters long',
			}),
		description: Joi
			.string()
			.alphanum()
			.optional(),
		image: [{
			type: String,
			require: false
		}],
		video: Joi
			.array()
			.items(Joi
				.string()
				.alphanum()
				.optional()
			)
			.optional(),
		ingredients: Joi.array().items({
			ingredient: Joi
				.string()
				.alphanum()
				.length(24)
				.required(),
			quantity: Joi
				.number()
				.min(0)
				.required(),
			image: Joi
				.string()
				.alphanum()
				.optional()
		})
			.min(1)
			.required(),
		servings: Joi
			.number()
			.min(1)
			.default(1)
			.optional(),
		instructions: Joi
			.array()
			.items({
				order: Joi
					.number()
					.required(),
				instruction: Joi
					.string()
					.alphanum()
					.required()
			})
			.min(1)
			.required(),
		vegan: Joi
			.boolean()
			.default(false)
			.optional(),
		vegetarian: Joi
			.boolean()
			.default(false)
			.optional(),
		suitable_celiac: Joi
			.boolean()
			.default(false)
			.optional()
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
		name: Joi
			.string()
			.min(2)
			.optional(),
		description: Joi
			.string()
			.alphanum()
			.optional(),
		image: [{
			type: String,
			require: false
		}],
		video: Joi
			.array()
			.items(Joi
				.string()
				.alphanum()
				.required()
			)
			.optional(),
		ingredients: Joi.array().items({
			ingredient: Joi
				.string()
				.alphanum()
				.length(24)
				.required(),
			quantity: Joi
				.number()
				.min(0)
				.required(),
			image: Joi
				.string()
				.alphanum()
				.optional()
		})
			.min(1)
			.required(),
		servings: Joi
			.number()
			.min(1)
			.optional(),
		instructions: Joi
			.array()
			.items({
				order: Joi
					.number()
					.required(),
				instruction: Joi
					.string()
					.alphanum()
					.required()
			})
			.min(1)
			.required(),
		vegan: Joi
			.boolean()
			.default(false)
			.optional(),
		vegetarian: Joi
			.boolean()
			.default(false)
			.optional(),
		suitable_celiac: Joi
			.boolean()
			.default(false)
			.optional()
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
