import mongoose from 'mongoose';

const { Schema } = mongoose;

const utensilSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
});

export default mongoose.model('Utensil', utensilSchema);
