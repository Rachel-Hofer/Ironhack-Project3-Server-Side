const express = require('express');
const router  = express.Router();
const Property = require('../models/Property');
const Review = require('../models/Review')


// View for all reviews
// /api/all-reviews
// tested and working
router.get('/all-reviews', (req,res,next) =>{
    Review.find()
    .then((allReviews) =>{
        res.json(allReviews)
    })
    .catch((err)=>{
        res.json(err)
    })
});


// View for all reviews of ONE property
// /api/all-reviews/:property._id
// **HAVE TO FIGURE OUT HOW TO LINK PROPERTY ID to PROPERTY KEY**
router.get('/all-reviews/:property._id', (req,res,next) =>{
    Property.find()
    .then((allProperties) =>{
        res.json(allProperties)
    })
    .catch((err)=>{
        res.json(err)
    })
});


// Creates review
// /api/create-review
// tested and working
router.post('/create-review', (req, res, next) => {
    Review.create({
        // author: req.user._id, cannot test until logged-in
        // property: property_.id??,
        message: req.body.message,
        rating: req.body.rating
    })
    .then((response) =>{
        res.json(response)
    })
    .catch((err) =>{
        res.json(err)
    })
});


// Edits review
// /api/edit-review/:id
// tested and working
router.post('/edit-review/:id', (req,res,next) =>{
    Review.findByIdAndUpdate(req.params.id, {
        // author: req.user._id, cannot test until logged-in
        // property: property_.id??,
        message: req.body.message,
        rating: req.body.rating
    })
        .then((response) =>{
            if(response === null){ 
                res.json({message: 'Sorry, you must enter a Review ID. Please try again.'})
                return;
            }
            res.json(response)
        })
        .catch((err) =>{
            res.json([{message: 'Sorry, we could not find this Review. Please try another ID.'}, err])
        })
});


// Deletes review
// /api/delete-review/:id
// tested and working 
router.post('/delete-review/:id', (req, res, next)=>{
    Review.findByIdAndRemove(req.params.id)
    .then((deletedReview)=>{
        if(deletedReview === null){
            res.json({message: 'Sorry this review could not be found'})
            return;
        } 
        res.json([
            {message: 'Review successfully deleted'},
            deletedReview
        ])
    })
    .catch((err)=>{
        res.json([{message: 'Sorry this Review could not be found'}, err])
    })
})


module.exports = router;