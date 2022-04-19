const express = require('express');
const router = express.Router();


const batchCont=require("../controllers/BatchCont")
const developerCont=require("../controllers/developerCont")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



router.post("/batches",batchCont.createBatch)
router.post("/developer",developerCont.createDeveloper)
router.get("/scholarship-Developers",developerCont.scholarShipDev)
router.get("/getData",developerCont.developers)

module.exports = router;