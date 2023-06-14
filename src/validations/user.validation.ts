import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import StatusCode from '../constants/status'

export const createValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const Schema = Joi.object({
    email: Joi.string().email().min(4).required().messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
      'string.email': 'Email is not valid'
    }),
    username: Joi.string().min(3).optional().messages({
      'string.empty': 'Username must be at least 3 characters long',
      'string.min': 'Username must be at least 3 characters long',
    }),
    password: Joi.string().min(8).required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password must be at least 8 characters long',
      'string.min': 'Password must be at least 8 characters long',
    }),
    name: Joi.string().min(2).required().messages({
      'any.required': 'Name is required',
      'string.empty': 'Name must be at least 3 characters long',
      'string.min': 'Name must be at least 3 characters long',
    }),
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
    username: Joi.string().min(3).optional().messages({}),
    password: Joi.string().min(8).required().messages({}),
    name: Joi.string().min(2).required().messages({}),
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
