const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema({
    email: String,
    password: String,
    fullName: String,
    image: String,
    propertiesOwned: {type: [Schema.Types.ObjectId], default : [], ref: 'Property'},
    propertiesViewed: {type: [Schema.Types.ObjectId], default : [], ref: 'Property'},
    owner: Boolean
  });

  
  const User = mongoose.model("User", userSchema);
  
  
  module.exports = User;