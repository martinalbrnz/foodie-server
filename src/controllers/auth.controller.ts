import { compareSync } from "bcrypt"
import { Request, Response } from "express"
import StatusCode from "../constants/status"
import { ATO_DURATION, RTO_DURATION } from "../constants/token"
import { RTOPayload } from "../interfaces/tokenPayload.interface"
import User from '../models/user.model'
import { decodeToken, generateToken } from "../services/jwt"

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ $or: [{ email: email }, { username: email }] }).lean()
    if (!user) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ data: 'User does not exist', error: true })
    }

    if (user && !user.is_active) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ data: 'User is inactive', error: true })
    }

    if (user && user.password && compareSync(password, user.password)) {
      delete user.password

      const ATO = generateToken({ role: user.role, _id: user._id }, { expiresIn: ATO_DURATION })
      const RTO = generateToken({ refresh: true, _id: user._id }, { expiresIn: RTO_DURATION })

      return res
        .status(StatusCode.OK)
        .json({
          data: { user, ATO, RTO },
          error: false
        })
    } else {
      return res.status(StatusCode.UNAUTHORIZED).json({ data: 'Authentication Error', error: true })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      data: error.message,
      error: true,
    })
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const previousRTO = req.headers.authorization?.split(' ')[1]
    if (!previousRTO) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({
          data: 'Authentication Error',
          error: true
        })
    }

    const rtoPayload = decodeToken(previousRTO) as RTOPayload

    if (!rtoPayload) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({
          data: 'Authentication Error',
          error: true
        })
    }

    if (!rtoPayload.refresh) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({
          data: 'Authentication Error',
          error: true
        })
    }

    const ATO = generateToken(
      { role: rtoPayload?.role, _id: rtoPayload?._id },
      { expiresIn: ATO_DURATION }
    )
    const RTO = generateToken(
      { refresh: true, _id: rtoPayload?._id },
      { expiresIn: RTO_DURATION }
    )

    return res
      .status(StatusCode.OK)
      .json({
        data: { ATO, RTO },
        error: false
      })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({
        data: error.message,
        error: true,
      })
  }
}
