const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcryptjs');
const passport      = require('passport');


const User          = require('../models/UserModel');
const Property      = require('../models/Property');
// import the user model




passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {

  User.findById(userIdFromSession).populate({path: 'propertiesCreated', model: 'Property'}).populate({path: 'propertiesViewed', model: 'Property'})
  .then((userDocument)=>{
    


    cb(null, userDocument);
  })
  .catch((err)=>{
    cb(err);
    return;
  })
});
  
  
  



passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    ((email, password, next) =>{
    User.findOne({email}, (err, user) =>{
      if(err) {return next(err)}
      if(!user){ return next(null, false, {message: "Incorrect email"})};
      if(!bcrypt.compareSync(password, user.password)) {return next(null, false, {message: "incorrect password"})}
  
  
      return next(null, user);
  
  
    })
  })));