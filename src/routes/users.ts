import express, { Router } from "express"
import { createUser, getAll, getUserById } from "../controllers/users.controller"
import { authMiddleware } from "../middleware/auth"
import { createValidation } from "../validations/user.validation"

const usersRouter: Router = express.Router()
	.get('/:id', authMiddleware, getUserById)
	.get('/', authMiddleware, getAll)
	.post('/', createValidation, createUser)

export default usersRouter
