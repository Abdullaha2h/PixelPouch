var express = require("express");
const userModel = require("../models/user-model");
const { registerUser , loginUser, logout} = require("../controllers/authController");
var router = express.Router();

router.get("/", (req, res, next) => {
  res.send("hey");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

 router.get('/allusers',async (req,res)=>{const allusers=await userModel.find(); res.send(allusers)})

module.exports = router;
