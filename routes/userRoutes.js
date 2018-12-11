const express  = require('express');
const router   = express.Router();

const bcrypt   = require('bcryptjs');
const passport = require('passport');

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

    User.findOne({email: req.body.theEmail })
    .then((findedUser) =>{
        if(findedUser!==null){
            res.json({message: 'That email is already taken'});
            return;
        }

        const salt     = bcrypt.genSaltSync(10);
        const theHash  = bcrypt.hashSync(req.body.thePassword, salt )

        User.create({
            email    : req.body.theEmail,
            password : theHash,
            fullName : req.body.theFullName,
            image    : req.body.theImage        
        })
        .then((theUser) =>{
            req.login(theUser, (err) =>{
                if(err) { 
                    res.status(500).json({message : 'Login after signup went bad'})
                    return
                 }
                 res.json(theUser);
            })
        })
        .catch((err) =>{
            res.json({ message: 'something went wrong with creating user'})
        })
    })
    .catch((err) =>{
        res.json({message: 'something is really bad'})
    })
});


// View for single user
// /api/user/:id
router.get('/user/:id', (req,res,next)=>{
    User.findById(req.params.id)
        .then((response) =>{
            if(response === null){
                res.json({message: 'sorry we could not find this User'})
                return;
            }
            res.json(response)
        })
        .catch((err) =>{
            res.json({message: 'sorry we could not find this user'})
        })
});


// View for single user
// /api/user/:id
router.post('/edit-user/:id', (req,res,next) =>{

    User.findOne({email: req.body.theEmail })
    .then((findedUser)=>{
        if(findedUser!==null){
            res.json({message: 'That email is already taken'});
            return;
        }

        const salt     = bcrypt.genSaltSync(10);
        const theHash  = bcrypt.hashSync(req.body.thePassword, salt );

        User.findByIdAndUpdate(req.params.id, {
            email: req.body.theEmail,
            password: theHash,
            fullName: req.body.theFullName,
            image: req.body.theImage,
        })
        .then((updatedUser) =>{
            if(updatedUser === null){
                res.json({message: 'sorry we could not find this user'})
                return;
            }
            res.json([{ message:  'everything went cool'}, updatedUser])
        })
        .catch((err) =>{
            res.json(err)
        })

    })
    .catch((err) =>{
        res.json(err)
    })
});







module.exports = router;
