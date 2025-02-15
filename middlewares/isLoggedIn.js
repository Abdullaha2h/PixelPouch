const jwt=require("jsonwebtoken");
const userModel = require("../models/user-model");


module.exports=async(req,res,next)=>{
    if(!req.cookies.token){
        req.flash("error","Kindly Login First.")
        return res.redirect("/")
    }

    try{
        const decoded=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        const user= await userModel
        .findOne({email:decoded.email})
        .select("-password") // do not select password field, that is why -password
        
        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/");
          }
      
          req.user = user;
          next();
    }
    catch(err){
        req.flash("error","something went wrong");
        res.redirect("/")
    }


}