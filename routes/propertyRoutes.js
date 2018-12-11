const express = require('express');
const router  = express.Router();
const Property = require('../models/Property');
const User = require('../models/UserModel');
const axios = require('axios');

const uploader  = require('../config/cloud');

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

// axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${process.env.googleMapsAPI}`)
//     .then((response)=>{
//         console.log("RESPONSE.DATA<><><><><><><>", response.data.results[0].formatted_address)
//     .catch((err)=>{
//         console.log(err)
//     })
// })

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




router.post('/create-property', uploader.single('the-picture'), (req, res, next) => {
    axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.address}&key=${process.env.googleMapsAPI}`)
    .then((response)=>{
        console.log("RESPONSE.DATA<><><><><><><>", response.data.results[0].formatted_address)

        Property.create({
            image: req.file.url,
            address: response.data.results[0].formatted_address,
            features: req.body.features,
            review: req.body.review,
            creator: req.user._id, // cannot test until logged-in
            averageRating: req.body.averageRating
        })
            .then((createdProperty) =>{
                User.findByIdAndUpdate(req.user._id, {$push: {propertiesCreated :createdProperty._id }}).populate('propertiesCreated')
                    .then((response)=> {
                        res.json(createdProperty)
                    })
                    .catch((err)=>{
                        res.json(err)
                    })
                    .catch((err) =>{
                        res.json(err)
                    })
            })
            .catch((err)=>{
                console.log(err)
            })
    })
    .catch((err)=>{
    })
})


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
router.post('/edit-property/:id', uploader.single('the-picture') , (req,res,next) =>{
    Property.findByIdAndUpdate(req.params.id, {
        image: req.file.url,
        address: req.body.address,
        zipCode: req.body.zipCode,
        features: req.body.features,
        review: req.body.review,
        creator: req.user._id, // cannot test until logged-in
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