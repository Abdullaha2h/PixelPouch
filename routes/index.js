const express=require("express")
const router=express.Router()
const isloggedin=require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
    const error=req.flash("error")
    const loggedin = false;
    res.render('index', { error ,loggedin
    });
});

router.get("/shop", isloggedin, async (req, res) => {
   const products= await productModel.find()
   const loggedin = true;
    const success=req.flash("success")
    res.render("shop",{products,loggedin,success})
});

router.get("/cart", isloggedin, async (req, res) => {
    
    const user=await userModel.findOne({email:req.user.email}).populate("cart");
    
    console.log(user.cart)
    const loggedin = true;
    const success=req.flash("success")
     res.render("cart",{loggedin,user,success})
 });


router.get("/addtocart/:productid", isloggedin, async (req, res) => {
    
    const user= await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.productid);
    await user.save()
    req.flash("success","Added to cart")
    res.redirect("/shop")

 });

 router.get("/removefromcart/:productid", isloggedin, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        const productId = req.params.productid;
        const productIndex = user.cart.indexOf(productId);

        if (productIndex !== -1) {
            user.cart.splice(productIndex, 1);
            await user.save(); // Save the updated cart
            req.flash("success", "Product removed from cart");
        } else {
            req.flash("error", "Product not found in cart");
        }
        res.redirect("/cart");
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("/cart");
    }
});

// Define the route to view and update user account
router.get("/myaccount", isloggedin, async (req, res) => {
    try {
        // Fetch the user's information from the database
        const user = await userModel.findOne({ email: req.user.email });

        // If no user found, redirect to login page
        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/login");
        }

        // Render the account page and pass user data to the view
        const loggedin = true;
        res.render("account", { user,loggedin });
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong while fetching your account");
        
        res.redirect("/login");
    }
});


module.exports=router;