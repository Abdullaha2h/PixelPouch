const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken,js");
const userModel = require("../models/user-model");


module.exports.registerUser=async (req, res, next) => {
    try {
      const { email, fullname, password } = req.body;
  
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ error: "This account already exists, kindly login" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      
      const user = await userModel.create({
        email,
        fullname,
        password: hashedPassword, 
      });
      // res.send(user)
  
    const token =  generateToken(user)
      res.cookie("token",token)
      res.send("user created succesfully")
  
    } catch (err) {
      res.status(500).send({ error: err.message });
  
    }
  }

module.exports.loginUser=async(req,res)=>{
    try{
    const {email,password}=req.body;
   const user=  await userModel.findOne({email:email})
   if (!user) {
    return res.status(400).send({ error: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
//    res.send(isMatch)
   if(isMatch){const token= generateToken(user);
    res.cookie("token",token)
    return res.redirect("/shop");
   }
   else{ return res.status(400).send({ error: "Invalid email or password" });}
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
      }

}

module.exports.logout=async(req,res)=>{res.cookie("token","");
    res.redirect("/")
}