const express = require('express');
const router = express.Router();
const userController = require("../controller/usercontroller")
const bookController = require("../controller/bookController")
const loginController = require("../controller/loGin")
const reviewController = require("../controller/reviewController")
const mid = require("../middleware/allmiddleWare")



//User apis
router.post("/register", userController.createuser)
router.post("/login",loginController.loginUser)


//Book apis
router.post("/book",mid.middleware, bookController.createBook)
router.get("/books",mid.middleware, bookController.getBooks)
router.get("/books/:bookId",mid.middleware, bookController.getBooksBYId)
router.put("/books/:bookId",mid.middleware,bookController.updateBooksBYId)

router.delete("/books/:bookId",mid.middleware,bookController.deleteBooksBYId)


//Review apis
router.post("/books/:bookId",reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReviews)
router.post("/books/:bookId/review/:reviewId",reviewController.deleteReview)
module.exports = router;


