import mongoose, { Schema } from 'mongoose'

const CommentSchema = new Schema({
	recipe: {
		type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', require: true
	},
	text: {
		type: String,
		require: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true
	}
}, {
	timestamps: true
})

CommentSchema.index({ recipe: 1 })

export default mongoose.model('Comment', CommentSchema)
