const mongoose = require('mongoose')

const blockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  repetitionType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'repetitionType'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
})

module.exports = mongoose.model('block', blockSchema)