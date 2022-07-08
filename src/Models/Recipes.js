import mongoose from 'mongoose';

const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: { type: String, required: true },
  vegetarian: { type: Boolean, required: true },
  vegan: { type: Boolean, required: true },
  glutenFree: { type: Boolean, required: true },
  image: { type: String },
  ingredients: [{
    _id: false,
    ingredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
    amount: { type: String, required: true },
    unit: { type: String, default: 'g', enum: ['g', 'unit', 'ml'] },
  }],
  utensils: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Utensils' }],
  instructions: [{ type: String }],
  estimatedTime: { type: Number },
});

export default mongoose.Schema('Recipe', recipeSchema);
