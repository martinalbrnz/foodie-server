import { NextFunction, Request, Response } from "express"
import StatusCode from "../constants/status"
import { TokenPayload } from "../interfaces/tokenPayload.interface"
import User from '../models/user.model'
import { decodeToken, verifyToken } from "../services/jwt"

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) {
			return res
				.status(StatusCode.UNAUTHORIZED)
				.json({ data: 'No token provided', error: true })
		}

		verifyToken(token)
		const payload = decodeToken(token) as TokenPayload

		if (payload && payload._id) {
			const currentUser = await User.findById(payload._id).lean()
			if (!currentUser?.is_active) {
				return res
					.status(StatusCode.UNAUTHORIZED)
					.json({ data: 'User is inactive', error: true })
			}
		} else {
			return res
				.status(StatusCode.UNAUTHORIZED)
				.json({ data: 'No user id provided', error: true })
		}

		return next()
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error.message === 'invalid signature') {
			return res
				.status(StatusCode.UNAUTHORIZED)
				.json({ data: 'Unauthorized', error: true })
		} else {
			return res
				.status(StatusCode.INTERNAL_SERVER_ERROR)
				.json({ data: error, error: true })
		}
	}
}
