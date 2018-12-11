const express = require('express');
const router  = express.Router();
const Property = require('../models/Property');

// View for all properties
// /api/all-properties
// tested and working
router.get('/all-properties', (req,res,next) =>{
    Property.find()
    .then((allProperties) =>{
        res.json(allProperties)
    })
    .catch((err)=>{
        res.json(err)
    })
});


// View for all properties in specific zip code
// /api/all-properties-by-zipCode/:zipCode
// still working on this one **
router.get('/all-properties-by-zipCode', (req,res,next) =>{
    Property.find({zipCode : req.body.zipCode})
    .then((allProperties) =>{
        res.json(allProperties)
    })
    .catch((err)=>{
        res.json(err)
    })
});


// Creates property
// /api/create-property
// tested and working
router.post('/create-property', (req, res, next) => {
    Property.create({
        image: req.body.image,
        address: req.body.address,
        zipCode: req.body.zipCode,
        features: req.body.features,
        // review: req.review._id,
        // creator: req.user._id,
        averageRating: req.body.averageRating
    })
    .then((response) =>{
        res.json(response)
    })
    .catch((err) =>{
        res.json(err)
    })
});


// View for single property
// /api/property/:id
// tested and working
router.get('/property/:id', (req,res,next)=>{
    Property.findById(req.params.id)
        .then((response) =>{
            if(response === null){
                res.json({message: 'Sorry, you must enter a Property. Please try again.'})
                return;
            }
            res.json(response)
        })
        .catch((err) =>{
            res.json([{message: 'Sorry, we could not find this Property. Please try another address.'}, err])
        })
});


// Edits property
// /api/edit-property/:id
// tested and working
router.post('/edit-property/:id', (req,res,next) =>{
    Property.findByIdAndUpdate(req.params.id, {
        image: req.body.image,
        address: req.body.address,
        zipCode: req.body.zipCode,
        features: req.body.features,
        // review: req.review._id,
        // creator: req.user._id, cannot test until logged-in
        averageRating: req.body.averageRating
    })
        .then((response) =>{
            if(response === null){ 
                res.json({message: 'Sorry, you must enter a Property. Please try again.'})
                return;
            }
            res.json(response)
        })
        .catch((err) =>{
            res.json([{message: 'Sorry, we could not find this Property. Please try another address.'}, err])
        })
});


// Deletes property
// /api/delete-property/:id
// tested and working
router.post('/delete-property/:id', (req, res, next)=>{
    Property.findByIdAndRemove(req.params.id)
    .then((deletedProperty)=>{
        if(deletedProperty === null){
            res.json({message: 'sorry this property could not be found'})
            return;
        } 

        res.json([
            {message: 'Property successfully deleted'},
            deletedProperty
        ])
    })
    .catch((err)=>{
        res.json([{message: 'sorry this property could not be found'}, err])
    })
})


module.exports = router;