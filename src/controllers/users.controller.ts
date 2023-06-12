import { genSaltSync, hashSync } from 'bcrypt'
import { Request, Response } from 'express'
import User from '../models/user.model'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password, name } = req.body
    const salt = genSaltSync(10)
    const pass = hashSync(password, salt)
    const newUser = await new User({ email, password: pass }).save()
    if (newUser.errors) {
      return res.status(400).json({
        data: newUser.errors,
        error: true
      })
    } else {
      return res.status(203).json({
        data: newUser,
        error: false
      })
    }
  } catch (error) {
    return res.status(500).json({
      data: error,
      error: true,
    })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      return res.status(200).json({
        data: user,
        error: false,
      })
    } else {
      return res.status(404).json({
        data: null,
        error: true,
      })
    }
  } catch (error) {
    return res.status(500).json({
      data: error,
      error: true,
    })
  }
}
