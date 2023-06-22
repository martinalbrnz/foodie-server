import mongoose, { Schema } from 'mongoose'

const RecipeSchema = new Schema({
	name: {
		type: String,
		unique: true,
		require: true,
		lowercase: true
	},
	description: {
		type: String
	},
	image: [{
		type: String,
		require: false
	}],
	video: [{
		type: String,
		require: false
	}],
	ingredients: [{
		_id: false,
		ingredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', require: true },
		quantity: { type: Number, require: true },
		image: { type: String, require: false }
	}],
	servings: { type: Number, default: 1 },
	instructions: [{
		order: { type: Number, require: true },
		instruction: { type: String, reuire: true }
	}],
	vegan: { type: Boolean, default: false },
	vegetarian: { type: Boolean, default: false },
	suitable_celiac: { type: Boolean, default: false }
})

export default mongoose.model('Recipe', RecipeSchema)
