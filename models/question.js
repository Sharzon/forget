const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  blockId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'block'
  },
  startDate: Date,
  nextRepetition: Date,
  repetitions: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

module.exports = mongoose.model('question', questionSchema)