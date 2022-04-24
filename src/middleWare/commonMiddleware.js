const jwt=require("jsonwebtoken")
const userModel=require("../models/userModel")
const authToken=function(req,res,next){
    let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  //If no token is present in the request header return error
  if (!token) return res.send({ status: false, msg: "token must be present" });

  console.log(token);
  
  let decodedToken = jwt.verify(token, "functionup-thorium");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });
    else
    {
        next()
    }

}
const userExist= async function (req,res,next){

    let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });
    else{
        next()
    }
}
module.exports.userExist=userExist
module.exports.authToken=authToken