const mongoose = require('mongoose')


const dataSchema = new mongoose.Schema({
  member_csv: {
    type: String,
    required: true
  },
  age_range: {
    type: String,
    required: true
  },
  tier: {
    type: String,
    required: true
  },
  500000: {
    type: Number,
    required: true
  },
  700000: {
    type: Number,
    required: true
  },
  1000000: {
    type: Number,
    required: true
  },
  1500000: {
    type: Number,
    required: true
  },
  2000000: {
    type: Number,
    required: true
  },
  2500000: {
    type: Number,
    required: true
  },
  3000000: {
    type: Number,
    required: true
  },
  4000000: {
    type: Number,
    required: true
  },
  5000000: {
    type: Number,
    required: true
  },
  6000000: {
    type: Number,
    required: true
  },
  7500000: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('data', dataSchema)