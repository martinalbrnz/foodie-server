import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
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
  isActive: {
    type: String,
    require: true,
    default: true
  },
})

export default mongoose.model('User', UserSchema)
