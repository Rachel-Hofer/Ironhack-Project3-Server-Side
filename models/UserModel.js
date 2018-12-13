const mongoose = require('mongoose');
const Schema   = mongoose.Schema;



const userSchema = new Schema({
    email: String,
    password: String,
    fullName: String,
    image: String,
    zipCode: Number,
    profilePic: {type: String, default: "http://alumni.crg.eu/sites/default/files/default_images/default-picture_0_0.png"},
    propertiesCreated: {type: [Schema.Types.ObjectId], ref: 'Property'},
    propertiesViewed: {type: [Schema.Types.ObjectId], default : [], ref: 'Property'},
  });

  
  const User = mongoose.model("User"  , userSchema);
  
  
  module.exports = User;