const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel')
const userModels = require('../models/userModel')
const orderModels = require('../models/orderModel')
 const allControllers = require('../controllers/allControl')
 const middleware= require('../middlewares/allMiddleware')


   router.post('/createProduct',allControllers.createProduct)
    router.post('/createUser',middleware.mid1,allControllers.createUser)
    router.post('/createOrder',middleware.mid1,allControllers.createOrder)
  //  router.get('/scholarship-developers',allControllers.getScholershipDevs)
  //   router.get('/getDevs',allControllers.getDevs)
  //   router.get('/basicRoute',allControllers.basicRoute)
 
   
module.exports = router;