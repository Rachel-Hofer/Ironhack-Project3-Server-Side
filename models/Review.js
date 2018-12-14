const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const reviewSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    property: {type: Schema.Types.ObjectId, ref: 'Property'},
    message: String,
    rating: Number,
    likes : Number,
  });

  
  const Review = mongoose.model('Review', reviewSchema);
  
  
  module.exports = Review;