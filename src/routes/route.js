const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorcont")
const bookController= require("../controllers/bookCont")
const publisherController=require("../controllers/publisherCont")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )
router.post("/createPublisher",publisherController.createPublisher)

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;