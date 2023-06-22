import express, { Router } from "express"
import { create, getAll, getById, update } from '../controllers/recipes.controller'
import { authMiddleware } from "../middleware/auth"
import { createValidation, updateValidation } from "../validations/recipe.validation"

const recipesRouter: Router = express.Router()

export default recipesRouter
	.post('/', authMiddleware, createValidation, create)
	.get('/:id', authMiddleware, getById)
	.get('/', authMiddleware, getAll)
	.patch('/', authMiddleware, updateValidation, update)
