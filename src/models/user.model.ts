import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  email: { type: String, unique: true },
  username: String,
  password: String,
  salt: String,
  role: String,
  isActive: Boolean,
})

export default mongoose.model('User', UserSchema)
