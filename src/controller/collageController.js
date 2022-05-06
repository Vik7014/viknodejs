const internModel = require("../model/internModel")
const collageModel = require("../model/collageModel")

//globally we are validating functions  user entry

const isValid = function (value) {

    if (typeof value === 'undefined' || value === null)
        return false
    if (typeof value === 'string' && value.trim().length === 0)
        return false
    if (typeof value === 'number')
        return false
    return true
}

//here we are validating request body

const isValidRequestBody = function (data) {
    return Object.keys(data.length > 0)
}


//post api for college 
const collegeCreate = async function (req, res) {

    try {
        // performing major validation

        const data = req.body

        if (!isValidRequestBody(data)) {
            res.status(400).send({ status: false, message: "invalid request parametere,provide college details" })
            return
        }
        if (!isValid(data.name)) {
            res.status(400).send({ status: false, message: "college name is required" })
            return
        }
        if (!isValid(data.fullName)) {
            res.status(400).send({ status: false, message: "full name is required" })
            return
        }
        if (!isValid(data.logoLink)) {

            res.status(400).send({ status: false, message: "logoLink is required" })
            return
        }

        
        // taken collage name unique
        let uniqueNameCheck = await collageModel.findOne({ name: data.name })
        if (uniqueNameCheck) {
            return res.status(400).send({ status: false, message: "this name already exist" })
        }
        // taken fullname unique
        let uniqueFullNameCheck = await collageModel.findOne({ fullName: data.fullName })
        if (uniqueFullNameCheck) {
            return res.status(400).send({ status: false, message: "this full name already exist" })
        }
        //taken logolink unique
        let uniqueLogoLinkUrl = await collageModel.findOne({ logoLink: data.logoLink })
        if (uniqueLogoLinkUrl) {
            return res.status(400).send({ status: false, message: "this logoLink Url already exist" })
        }

        //validation ends here

        // sending response to response body
        let collegeCreate = await collageModel.create(data)
        res.status(201).send({ status: true, data: collegeCreate, message: "college created successfully" })

        // gives a error response
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}

// get api for college detail

const collegeDetails = async function (req, res) {

  try {
    const collegeName = req.query.collegeName;
    if (!collegeName)

        return res.status(400).send({ status: false, msg: 'please provide collegeName in the query' })

    const collegeNames = await collageModel.findOne({ name: collegeName, isDeleted: false })
    if (!collegeNames) {
        return res.status(404).send({ status: false, message: "no college available with this name" })
    }

    const { name, fullName, logoLink } = collegeNames

    const collegeId = collegeNames._id

    const internDetails = await internModel.find({ collegeId: collegeId, isDeleted: false }).select({ "_id": 1, "name": 1, "email": 1, "mobile": 1 })

    const data = { name: name, fullName: fullName, logoLink: logoLink, interest: internDetails }
    return res.status(200).send({ status: true, data: data })
}
catch (err) {
    res.status(500).send({ status: false, msg: err.message });
}
}



  



// publically imported
module.exports.collegeCreate = collegeCreate
module.exports.collegeDetails= collegeDetails