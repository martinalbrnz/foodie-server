import { compareSync } from "bcrypt";
import { Request, Response } from "express";
import StatusCode from "../constants/status";
import User from '../models/user.model';
import { generateToken } from "../services/jwt";

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ $or: [{ email: email }, { username: email }] }).lean()

		if (user && compareSync(password, user.password!)) {
			delete user.password
			const ATO = generateToken({ role: user.role, _id: user._id }, { expiresIn: '30m' })
			const RTO = generateToken({ refresh: true, _id: user._id }, { expiresIn: '2h' })
			return res
				.status(StatusCode.OK)
				.json({
					data: { user, ATO, RTO },
					error: false
				})
		} else {
			return res
				.status(StatusCode.UNAUTHORIZED)
				.json({
					data: 'Authentication Error',
					error: true
				})
		}
	} catch (error: any) {
		return res.status(500).json({
			data: error.message,
			error: true,
		})
	}
}

export const refreshToken = async (req: Request, res: Response) => {
	try {

	} catch (error: any) {
		return res.status(500).json({
			data: error.message,
			error: true,
		})
	}
}
