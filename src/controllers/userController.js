const bookModel= require("../models/BookModel")

const bookUser= async function (req, res) {
    let data= req.body
    let savedData= await bookModel.create(data)
    res.send({msg: savedData})
}

const bookUsersData= async function (req, res) {
    let allUsers= await bookModel.find()
    res.send({msg: allUsers})
}

module.exports.bookUser= bookUser
module.exports.bookUsersData= bookUsersData