const mongoose = require('mongoose')


const adultSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
      },
    age: {
        type: String,
        required: true
      },
    tier: {
        type: String,
        required: true
      },
    tenure: {
        type: String,
        required: true
      },
    cost: {
        type: Number,
        required: true
      },
    discount: {
        type: String,
        required: true
      },
});

const childSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
      },
    age: {
        type: String,
        required: true
      },
    tier: {
        type: String,
        required: true
      },
    tenure: {
        type: String,
        required: true
      },
    cost: {
        type: Number,
        required: true
      },
    discount: {
        type: String,
        required: true
      },
});

const cartSchema = new mongoose.Schema({
    adults: [adultSchema],
    children: [childSchema],
    insuredSum: {
        type: Number,
        required: true
      },
    totalDiscountedPrice: {
        type: Number,
        required: true
      },
});

module.exports = mongoose.model('cart', cartSchema)