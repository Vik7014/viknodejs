const { default: mongoose } = require("mongoose")
const publisherModel = require("../models/publisher")
const authorModel= require("../models/publisher")

const createPublisher= async function (req, res) {
    let publisher = req.body
    let publisherCreated = await publisherModel.create(publisher)
    res.send({data: publisherCreated})
}

module.exports.createPublisher=createPublisher