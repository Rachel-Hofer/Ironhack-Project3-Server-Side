const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const ReviewSchema = new Schema({



    author: {type: Schema.Types.ObjectId, ref: 'User'},
    property: {type: Schema.Types.ObjectId, ref: 'Property'},
    message: String,
    rating: Number

  });

  
  const Review = mongoose.model("Review", ReviewSchema);
  
  
  module.exports = Review;