const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const propertySchema = new Schema({
  image: String,
  address: String,
  features: {type: Array, enum: ['lights', 'figurines', 'music', 'carolers', 'hot chocolate']},
  averageRating: Number
  });

  
  const Property = mongoose.model("Property", propertySchema);
  
  
  module.exports = Property;