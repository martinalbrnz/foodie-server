import express from 'express'
import authRoutes from './auth'
import usersRouter from './users'

export default express.Router()
	.use('/users', usersRouter)
	.use('/auth', authRoutes)
