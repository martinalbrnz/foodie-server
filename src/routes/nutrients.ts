import express, { Router } from "express"
import { create, getAll, update } from "../controllers/nutrients.controller"
import { authMiddleware } from "../middleware/auth"
import { createValidation, updateValidation } from "../validations/nutrient.validation"

const nutrientsRouter: Router = express.Router()
	.get('/', authMiddleware, getAll)
	.post('/', authMiddleware, createValidation, create)
	.patch('/:id', authMiddleware, updateValidation, update)

export default nutrientsRouter
