const express = require("express");
const router = express.Router();

router.get("/", function(req, res){
    res.send("express is started! this is index!");
})

module.exports = router;