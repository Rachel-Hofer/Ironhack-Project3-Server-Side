const express = require('express');
const router  = express.Router();
const User    = require('../models/UserModel');



// Create user
// /api/create-user
router.post('/create-user', (req, res, next) => {

    User.create({

    email: req.body.theEmail,
    password: req.body.thePassword,
    fullName: req.body.theFullName,
    image: req.body.theImage,
    propertiesOwned: [],
    propertiesViewed: [],
    owner: false
    })
    .then((response) =>{
        res.json(response)
    })
    .catch((err) =>{
        res.json(err)
    })

});

module.exports = router;
