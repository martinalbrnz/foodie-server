import mongoose, { Schema } from 'mongoose'
import { nutrientMU } from '../constants/measurementUnits'

const NutrientSchema = new Schema({
	name: {
		type: String,
		unique: true,
		require: true,
		lowercase: true
	},
	mu: {
		type: String,
		enum: nutrientMU,
		require: true
	}
})

export default mongoose.model('Nutrient', NutrientSchema)
