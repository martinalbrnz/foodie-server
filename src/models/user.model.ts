import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  username: {
    type: String,
    lowercase: true,
    require: false
  },
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
    default: 'user'
  },
  is_active: {
    type: String,
    require: true,
    default: true
  },
})

export default mongoose.model('User', UserSchema)
