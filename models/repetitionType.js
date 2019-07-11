const mongoose = require('mongoose')

const repetitionTypeSchema = new mongoose.Schema({
  threshold: Number,
  thresholdDistance: Number,
  distance: Number,
  
  intervalAmp: Number
})

module.exports = mongoose.model('repetitionType', repetitionTypeSchema)