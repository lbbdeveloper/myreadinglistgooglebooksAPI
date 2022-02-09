import mongoose from 'mongoose'

export {
  Book
}

const bookSchema = new mongoose.Schema({
  googleId: String,
  title: String,
  img: {
    type: String,
    default:"/images/book/sketches/placeholder.png",
  },
  authors: String,
  description: String,
  publishedDate: String,
  collectedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}],
}, {
  timestamps: true
})

const Book = mongoose.model('Book', bookSchema)