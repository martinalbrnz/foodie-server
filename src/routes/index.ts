import express from 'express'
import usersRouter from './users'

export default express.Router()
	.use('/users', usersRouter)
