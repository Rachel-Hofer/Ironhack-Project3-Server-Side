const express = require('express');
const router  = express.Router();
const Property = require('../models/Property');
const User = require('../models/UserModel');
const Review = require('../models/Review');

const axios = require('axios');
const uploader  = require('../config/cloud');

// GET all properties
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

// *************************************************************************************
// use same GET for all properties(above), then SORT ON THE FRONT END by average Rating
// *************************************************************************************


// POST to get all properties by searched zipCode
// /api/all-properties-searched-zipCode
// tested and working
router.post('/all-properties-searched-zipCode', (req,res,next) =>{
    let searchedZipCode = req.body.zipCode
    if(searchedZipCode === null){
        res.json({message: 'Sorry, you must enter a zip code to search. Please try again.'})
        return
    }
    if(searchedZipCode !== Number){
        res.json({message: 'Sorry, you must enter a numerical zip code to search. Please try again.'})
        return
    }
        Property.find({zipCode: searchedZipCode})
            .then((allProperties) =>{
                res.json(allProperties)
        })
            .catch((err)=>{
                res.json(err)
        })
});  // end of all properties by searched zipCode


// GET all properties in USERS zipCode - //"Find lights near me"
// /api/all-properties-user-zipCode
// tested and working
router.get('/all-properties-user-zipCode', (req,res,next) =>{
    let theZipCode = req.user.zipCode;
    Property.find({zipCode: theZipCode})
    .then((allProperties) =>{
        res.json(allProperties)
    })
    .catch((err)=>{
        res.json(err)
    })
});  // end of view ALL properties route


// Creates property
// /api/create-property
// tested and working
router.post('/create-property', uploader.single('the-picture'), (req, res, next) => {
    axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.address}&key=${process.env.googleMapsAPI}`)
    .then((response)=>{
        Property.create({
            image: req.file.url,
            address: response.data.results[0].formatted_address, //to get full address from Google API
            features: req.body.features,
            review: req.body.review,
            creator: req.user._id, // cannot test until logged-in
            averageRating: req.body.averageRating,
            zipCode: response.data.results[0].address_components[7].long_name
        })
            .then((createdProperty) =>{
                User.findByIdAndUpdate(req.user._id, {$push: {propertiesCreated :createdProperty._id }}).populate('propertiesCreated')
                    .then((response)=> {
                        res.json(createdProperty)
                    })
                    .catch((err)=>{
                        res.json(err)
                    })
            })
            .catch((err)=>{
                console.log(err)
            })
    })
    .catch((err)=>{
    })
})  // end of create new property route


// View for single property
// /api/property/:id
// tested and working
router.get('/property/:id', (req,res,next)=>{
    Property.findById(req.params.id)
        .then((theProperty) =>{
            if(theProperty === null){
                res.json({message: 'Sorry, you must enter a Property. Please try again.'})
                return;
            }
            res.json(theProperty)
        })
        .catch((err) =>{
            res.json([{message: 'Sorry, we could not find this Property. Please try another address.'}, err])
        })
});  // end of view single property route


// Edits property
// /api/edit-property/:id
// tested and working
router.post('/edit-property/:id', uploader.single('the-picture') , (req,res,next) =>{
    axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.address}&key=${process.env.googleMapsAPI}`)
    .then((response)=>{
        Property.findByIdAndUpdate(req.params.id, {
            image: req.file.url,
            address: response.data.results[0].formatted_address,
            features: req.body.features,
            review: req.body.review,
            creator: req.user._id, // cannot test until logged-in
            averageRating: req.body.averageRating,
            zipCode: response.data.results[0].address_components[7].long_name
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
    .catch((err)=>{
        res.json(err)
    })
    })
}); // end of edit property route


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
});  // end of delete property route


module.exports = router;