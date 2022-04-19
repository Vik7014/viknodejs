const developerModel = require("../models/developerModel")
const batchModel = require("../models/batchModel")
//const { get } = require("../routes/route")

const createDeveloper = async function(req,res){
    let data = req.body
    if(! await developerModel.exists(data)){
        let createData = await developerModel.create(data)
        res.send({msg: createData})
    } else{
        res.send({msg: "Developer already exists"})
    }
}



const scholarShipDev = async function(req,res){
    let selectDev = await developerModel.find({gender:"female",percentage:{$gte:70}}).select({name:1,_id:0})
    
        res.send({selectDev})

}


let developers = async function(req,res){
    let percent = req.query.percentage;
    let prm = req.query.program;
    let developer = await developerModel.find({ $and: [{ percentage: { $gte: percent } }, { program: prm }] })
    res.send({msg:developer})
}

module.exports.createDeveloper = createDeveloper
module.exports.scholarShipDev=scholarShipDev
module.exports.developers=developers