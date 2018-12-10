const express = require('express');
const router  = express.Router();
const Property    = require('../models/Property');

// List all properties
// /api/all-properties
router.get('/all-properties', (req,res,next) =>{
    Property.find()
    .then((allProperties) =>{
        res.json(allProperties)
    })
    .catch((err)=>{
        res.json(err)
    })
});

// Create property
// /api/create-property
router.post('/create-property', (req, res, next) => {
    Property.create({
        image: req.body.image,
        address: req.body.address,
        features: req.body.features,
        averageRating: req.body.averageRating
    })
    .then((response) =>{
        res.json(response)
    })
    .catch((err) =>{
        res.json(err)
    })
});
module.exports = router;