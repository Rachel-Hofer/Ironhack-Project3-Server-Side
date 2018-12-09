const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const UserSchema = new Schema({




    email: String,
    password: String,
    fullName: String,
    image: String,
    propertiesOwned: {type: [Schema.Types.ObjectId], default : [], ref: 'Property'},
    propertiesViewed: {type: [Schema.Types.ObjectId], default : [], ref: 'Property'},
    owner: Boolean

  });

  
  const User = mongoose.model("User", UserSchema);
  
  
  module.exports = User;