
const express = require('express');
const route = express.Router()

const { getData, addToCart, getCartData, emptyCart } = require('../controllers/dataController')


// to get all the posts
route.get('/', getData)

//Add to Cart
route.post('/addtocart', addToCart)

//Get Cart Data
route.get('/getcartdata', getCartData)

//Empty Cart
route.post('/emptycart', emptyCart)




module.exports = route;