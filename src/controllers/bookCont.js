const authorModel = require("../models/newauthor")
const newBook = require("../models/newBook")
const bookModel= require("../models/newBook")
const publisher = require("../models/publisher")
const publisherModel = require("../models/publisher")

const createBook= async function (req, res) {
    let data=req.body


    
    if (data.author && data.publisher) {
        let authIdCheck = await authorModel.exists({ _id: data.author })
        let publIdCheck = await publisherModel.exists({ _id: data.publisher })
        if (authIdCheck && publIdCheck) {
            if (!await bookModel.exists(data)) {
                let bookCreated = await bookModel.create(data)
                res.send({ msg: bookCreated })
            } else res.send({ msg: "Book already exists" })
        }
        else res.send("AuthorId and publisherId both or any one of these are Invalid")
    }
    else res.send ({msg: "Author and publisher Must be present"})
}




    



const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}


const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author').populate('publisher')
    res.send({data: specificBook})

}
// 5a problem 

const updateBooks = async function(req,res){
    let hardCoverPublisher = await publisher.find({name: {$in:['penguin','vikash']}}).select({_id: 1})
    let arrayOfPublisher = []
    for(let i=0; i< hardCoverPublisher.length;i++){
        let objId = hardCoverPublisher[i]._id
        arrayOfPublisher.push(objId)
    }
    let books = await newBook.updateMany({publisher: {$in: arrayOfPublisher}},{isHardCover: true})
    res.send({data: books})
}

module.exports.updateBooks= updateBooks
module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails