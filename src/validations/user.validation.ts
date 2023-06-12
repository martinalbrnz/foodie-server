import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import StatusCode from '../constants/status'

export const createValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const Schema = Joi.object({
    email: Joi.string().email().min(4).required().messages({}),
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
