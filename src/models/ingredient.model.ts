import mongoose, { Schema } from 'mongoose'

const IngredientSchema = new Schema({
	name: {
		type: String,
		unique: true,
		require: true,
		lowercase: true
	},
	description: {
		type: String
	},
	image: {
		type: String,
		require: false
	},
	nutritional_info: [{
		_id: false,
		nutrient: { type: mongoose.Schema.Types.ObjectId, ref: 'Nutrient' },
		quantity: { type: Number, default: 0 }
	}],
	vegan: { type: Boolean, default: false },
	vegetarian: { type: Boolean, default: false },
	suitable_celiac: { type: Boolean, default: false }
})

export default mongoose.model('Ingredient', IngredientSchema)
