import { genSaltSync, hashSync } from 'bcrypt'
import { Request, Response } from 'express'
import StatusCode from '../constants/status'
import User from '../models/user.model'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password, name } = req.body
    const salt = genSaltSync(10)
    const pass = hashSync(password, salt)
    const newUser = await new User({ email, password: pass, name, username }).save()
    if (newUser.errors) {
      return res.status(StatusCode.BAD_REQUEST).json({
        data: newUser.errors,
        error: true
      })
    } else {
      return res.status(StatusCode.CREATED).json({
        data: newUser,
        error: false
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      data: error.message,
      error: true,
    })
  }
}

export const getAll = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({})
    return res
      .status(StatusCode.OK)
      .json({
        data: allUsers,
        error: false
      })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({
        data: error.message,
        error: true
      })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).lean()
    if (user) {
      return res.status(StatusCode.OK).json({
        data: user,
        error: false,
      })
    } else {
      return res.status(StatusCode.NOT_FOUND).json({
        data: null,
        error: true,
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      data: error.message,
      error: true,
    })
  }
}
