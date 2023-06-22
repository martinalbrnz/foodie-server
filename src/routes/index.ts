import express from 'express'
import authRoutes from './auth'
import ingredientsRouter from './ingredients'
import nutrientsRouter from './nutrients'
import recipesRouter from './recipes'
import usersRouter from './users'

export default express.Router()
	.use('/users', usersRouter)
	.use('/auth', authRoutes)
	.use('/ingredients', ingredientsRouter)
	.use('/nutrients', nutrientsRouter)
	.use('/recipes', recipesRouter)
