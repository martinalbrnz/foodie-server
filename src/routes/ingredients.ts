import express, { Router } from "express"
import { create, getAll, getById, update } from '../controllers/ingredients.controller'
import { authMiddleware } from "../middleware/auth"
import { createValidation, updateValidation } from "../validations/ingredient.validation"

const ingredientsRouter: Router = express.Router()

export default ingredientsRouter
	.post('/', authMiddleware, createValidation, create)
	.get('/:id', authMiddleware, getById)
	.get('/', authMiddleware, getAll)
	.patch('/', authMiddleware, updateValidation, update)
