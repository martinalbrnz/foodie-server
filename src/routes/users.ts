import express, { Router } from "express";
import { createUser, getAll, getUserById } from "../controllers/users.controller";
import { createValidation } from "../validations/user.validation";

const usersRouter: Router = express.Router()
	.get('/:id', getUserById)
	.get('/', getAll)
	.post('/', createValidation, createUser)

export default usersRouter
