import { NextFunction, Request, Response } from "express";
import StatusCode from "../constants/status";
import { verifyToken } from "../services/jwt";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) {
			return res
				.status(StatusCode.UNAUTHORIZED)
				.json({ data: 'No token provided', error: true })
		}

		verifyToken(token)

		return next()
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