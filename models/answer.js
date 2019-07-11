const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
  result: {
    type: Number,
    required: true
  }
}, { timestamps: true })
const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'question'
  },
  results: [resultSchema]
})

module.exports = mongoose.model('answer', answerSchema)