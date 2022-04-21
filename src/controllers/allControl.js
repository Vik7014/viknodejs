const productModel = require('../models/productModel')
const userModel = require('../models/userModel')
const orderModel = require('../models/orderModel');
const moment = require('moment');

 const createProduct = async function (req, res) {
       let data = req.body
       let dataSaved = await productModel.create(data)
       res.send(  {  msg : dataSaved} )
    };


    const createUser = async function (req, res) {
      let data = req.body
      let data1=req.headers.isfreeappuser
      data['isFreeAppUser']=data1
      let data2 = data
      let dataSaved = await userModel.create(data2)
      res.send(  {  msg : dataSaved} )
   };

   const createOrder = async  function (req, res) {
 let data = req.body.userId
 let data1= req.body.productId
 let body = req.body
 
 let dataSaved = await userModel.find({_Id:data})
 let dataSaved1 = await productModel.find({_Id:data1})
if(dataSaved){
  
   if(dataSaved1){
    
      if(req.headers.isfreeappuser=='true'){
      
         body['isFreeAppUser']=true
         body['amount']=0
         body['date']=moment().format('L')
        
         let data4 = body
         let dataSaved2 = await orderModel.create(data4)
         res.send(dataSaved2)
      }else{
         let userBalance= await userModel.findById(data)
         let balance= userBalance.balance
         let productAmount= await productModel.findById(data1)
         let amount = productAmount.price

         if(balance<amount){
            res.send({msg:'insufficient balance'})
            
         }else{
            let userBalanceUpdate= await userModel.findByIdAndUpdate(data,{balance:(balance-amount)},{new:true})
            body['isFreeAppUser']=false
            body['amount']=amount
            body['date']=moment().format('L')
            let body1=body
            let purchaseOrder = await orderModel.create(body1)
            res.send({msg:purchaseOrder})
         }
      }
   }else
   res.send({msg:"productId is invalid"})

}else
res.send({msg: "userId is invalid"})
     
};
   

       module.exports.createProduct=createProduct
       module.exports.createUser=createUser
       module.exports.createOrder=createOrder
   
