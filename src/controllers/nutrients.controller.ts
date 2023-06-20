import { Request, Response } from "express"
import StatusCode from "../constants/status"
import Nutrient from '../models/nutrient.model'

export const getAll = async (req: Request, res: Response) => {
	try {
		const data = await Nutrient.find({}).lean()

		if (!data) {
			return res.status(StatusCode.NOT_FOUND).json({
				data: 'No data found',
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
			.status(StatusCode.BAD_REQUEST)
			.json({
				data: error.message,
				error: true
			})
	}
}

export const create = async (req: Request, res: Response) => {
	try {
		const { name, um } = req.body

		const data = await new Nutrient({ name, um }).save()
		if (data.errors) {
			return res.status(StatusCode.BAD_REQUEST).json({
				data,
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

export const update = async (req: Request, res: Response) => {
	try {
		const { name, mu } = req.body

		if (!req.params.id) {
			return res
				.status(StatusCode.INTERNAL_SERVER_ERROR)
				.json({
					data: "No id provided",
					error: true
				})
		}

		const data = Nutrient.findByIdAndUpdate(req.params.id, { name, mu })

		if (!data) {
			return res
				.status(StatusCode.NOT_FOUND)
				.json({
					data: `Nutrient with id ${req.params.id} not found`,
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
