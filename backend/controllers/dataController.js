const { model } = require('mongoose');
const allData = require('../models/models');
const cartData = require('../models/cartModels');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// to get all the data
const getData = async (req, res) => {
    try {
        const data = await allData.find();
        res.json(data);
        console.log("data is",data)
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      }
}

//to add to cart
const addToCart = async (req, res) => {
  const {adults, children, insuredSum, totalDiscountedPrice} = req.body;

  const update = {
    adults,
    children,
    insuredSum,
    totalDiscountedPrice
  };

  query = {};
  options = {
    upsert: true,
    new: true,
  };

    // add doc to DB
    try{
        const cartValue = await cartData.findOneAndUpdate(query, update, options);
        // const cartValue = await cartData.create(update)
        res.status(200).json(cartValue)
    }catch (error) {
        res.status(400).json({error: error.message})
    }
}

//To get value from cart
const getCartData = async (req, res) => {
  try {
    const currentCartdata = await cartData.find();
    res.json(currentCartdata);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}

// To empty the cart
const emptyCart = async (req, res) => {
  try {
    const result = await cartData.deleteMany({});
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}


module.exports = {
    getData,
    addToCart,
    getCartData,
    emptyCart
}