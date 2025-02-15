var express = require('express');
var router = express.Router();
const ownerModel = require("../models/owner-model");
if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        const owners = await ownerModel.find();
        if (owners.length >0) {
            return res.status(503).send("You can't create a new owner");
        }

        const { fullName, email, password } = req.body;

        try {
            const createdOwner = await ownerModel.create({
                fullName,
                email,
                password,
            });
            res.status(201).send(createdOwner);
        } catch (err) {
            res.status(500).send("Error creating owner: " + err.message);
        }
    });
}


router.get('/admin', (req, res, next) => {
    let success=req.flash("success")
    const loggedin = false;
    res.render("createproducts",{success,loggedin});
});

module.exports = router;