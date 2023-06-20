import dotenv from 'dotenv'
import {
	DecodeOptions,
	Secret,
	SignOptions,
	VerifyOptions,
	decode,
	sign,
	verify
} from 'jsonwebtoken'

dotenv.config()

const SECRET = process.env.SECRET as Secret

export const generateToken = <T>(payload: T, options?: SignOptions) => {
	return sign({ payload }, SECRET, options)
}

export const verifyToken = (token: string, options?: VerifyOptions) => {
	return verify(token, SECRET, options)
}

export const decodeToken = (token: string, options?: DecodeOptions) => {
	return decode(token, options)
}
