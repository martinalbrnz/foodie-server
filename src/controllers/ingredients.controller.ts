import { Request, Response } from "express"
import StatusCode from "../constants/status"
import Ingredient from '../models/ingredient.model'

export const create = async (req: Request, res: Response) => {
	try {
		const data = await new Ingredient(req.body).save()

		if (data.errors) {
			return res.status(StatusCode.BAD_REQUEST).json({
				data: data.errors,
				error: true
			})
		} else {
			return res.status(StatusCode.CREATED).json({
				data,
				error: false
			})
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return res
			.status(StatusCode.INTERNAL_SERVER_ERROR)
			.json({
				data: error.message,
				error: true
			})
	}
}

export const getById = async (req: Request, res: Response) => {
	try {
		const data = await Ingredient.findById(req.params.id).lean()

		if (!data) {
			return res.status(StatusCode.NOT_FOUND).json({
				data: null,
				error: true,
			})
		} else {
			return res.status(StatusCode.OK).json({
				data,
				error: false,
			})
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return res
			.status(StatusCode.INTERNAL_SERVER_ERROR)
			.json({
				data: error.message,
				error: true
			})
	}
}

export const getAll = async (req: Request, res: Response) => {
	try {
		const data = await Ingredient.find({}).lean()

		if (!data) {
			return res.status(StatusCode.NOT_FOUND).json({
				data: null,
				error: true,
			})
		} else {
			return res.status(StatusCode.OK).json({
				data,
				error: false,
			})
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return res
			.status(StatusCode.INTERNAL_SERVER_ERROR)
			.json({
				data: error.message,
				error: true
			})
	}
}

export const update = async (req: Request, res: Response) => {
	try {

		if (!req.params.id) {
			return res
				.status(StatusCode.INTERNAL_SERVER_ERROR)
				.json({
					data: "No id provided",
					error: true
				})
		}

		const data = Ingredient.findByIdAndUpdate(req.params.id, req.body)

		if (!data) {
			return res
				.status(StatusCode.NOT_FOUND)
				.json({
					data: `Ingredient with id ${req.params.id} not found`,
					error: true
				})
		}

		return res.status(StatusCode.OK).json({
			data,
			error: false
		})

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		return res
			.status(StatusCode.INTERNAL_SERVER_ERROR)
			.json({
				data: error.message,
				error: true
			})
	}
}
