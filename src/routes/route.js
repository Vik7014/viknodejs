const express = require('express');
const router = express.Router();
const internController= require("../controller/internController")
const collageController= require("../controller/collageController")


// router.post("/author",authorController.Author)
router.post("/intern", internController.createintern)
router.post("/collage", collageController.collegeCreate)
router.get("/detal",collageController.collegeDetails)














module.exports = router;