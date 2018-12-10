const express = require('express');
const router  = express.Router();
const User    = require('../models/UserModel');


// List all users
// /api/all-users
router.get('/all-users', (req,res,next) =>{
    User.find()
    .then((allUsers) =>{
        res.json(allUsers)
    })
    .catch((err)=>{
        res.json(err)
    })
});


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


// View for single user
// /api/user/:id
router.get('/user/:id', (req,res,next)=>{
    User.findById(req.params.id)
        .then((response) =>{
            if(response === null){
                res.json({message: 'sorry we could not find this user'})
                return;
            }
            res.json(response)
        })
        .catch((err) =>{
            res.json(err)
        })
});


// View for single user
// /api/user/:id
router.post('/user-edit/:id', (req,res,next) =>{
    User.findByIdAndUpdate(req.params.id, {
        email: req.body.theEmail,
        password: req.body.thePassword,
        fullName: req.body.theFullName,
        image: req.body.theImage,
        propertiesOwned: [],
        propertiesViewed: [],
        owner: false
    })
        .then((response) =>{
            if(response === null){
                res.json({message: 'sorry we could not find this user'})
                return;
            }
            res.json(response)
        })
        .catch((err) =>{
            res.json(err)
        })
});










module.exports = router;
