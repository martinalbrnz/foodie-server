import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  isVegetarian: { type: Boolean },
  isVegan: { type: Boolean },
  glutenFree: { type: Boolean },
  favoriteRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  likesIngredient: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
  hatesIngredient: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
