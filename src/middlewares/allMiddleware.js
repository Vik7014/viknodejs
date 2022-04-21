const mid1= function ( req,res,next){
    let isFreeAppUser= req.headers.isfreeappuser
    //console.log(isFreeAppUser)
if(isFreeAppUser){
    next();
}else res.send({msg:"the request is missing a mandatory header"})
}
module.exports.mid1=mid1