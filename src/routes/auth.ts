import express, { Router } from 'express'
import { login } from '../controllers/auth.controller'

const authRoutes: Router = express.Router()
	.post('/login', login)

export default authRoutes