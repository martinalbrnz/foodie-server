import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { nutrientMU } from '../constants/measurementUnits'
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
		mu: Joi.string().valid(nutrientMU)
			.required()
			.messages({
				'any.required': 'Measurement unit is required',
			})
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
		mu: Joi.string().valid(nutrientMU)
			.optional()
			.messages({
			})
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
