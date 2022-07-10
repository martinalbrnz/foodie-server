import mongoose from 'mongoose';

const { Schema } = mongoose;

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  nutritionalValues: [{
    _id: false,
    calories: { type: Number },
    proteins: { type: Number },
    carbs: { type: Number },
    fats: { type: Number },
  }],
  isVegetarian: { type: Boolean, required: true },
  isVegan: { type: Boolean, required: true },
  glutenFree: { type: Boolean, required: true },
  image: { type: String },
});

export default mongoose.model('Ingredient', ingredientSchema);
