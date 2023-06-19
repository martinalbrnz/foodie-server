import express, { Router } from 'express'
import { login, refreshToken } from '../controllers/auth.controller'
import { authMiddleware } from '../middleware/auth'

const authRoutes: Router = express.Router()
	.post('/login', login)
	.post('/refresh', authMiddleware, refreshToken)

export default authRoutes
