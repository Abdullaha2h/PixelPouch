var express = require('express');
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');
var router = express.Router();

/* GET home page. */
router.post('/create',upload.single("image"), async(req, res, next)=> {
  const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
  
  try {
    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success","Product created succesfully.")
    res.redirect("/owners/admin");
  } catch (error) {
    res.status(500).send("Error creating product: " + error.message);
  }
  
});

module.exports = router;
