const express = require('express');
const router = express.Router();
const internController= require("../controller/internController")
const collageController= require("../controller/collageController")


// router.post("/author",authorController.Author)
router.post("/functionup/interns", internController.createintern)
router.post("/functionup/colleges", collageController.collegeCreate)
router.get("/functionup/collegeDetails",collageController.collegeDetails)














module.exports = router;