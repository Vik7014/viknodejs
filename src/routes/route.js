const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const middleWare=require("../middleWare/commonMiddleware")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)


//The userId is sent by front end
router.get("/users/:userId",middleWare.authToken, userController.getUserData)

router.put("/users/:userId", middleWare.authToken,middleWare.userExist, userController.updateUser)
router.delete("/users/:userId",middleWare.authToken,middleWare.userExist,   userController.deleteUser)

module.exports = router;