const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const propertySchema = new Schema({
  image: String,
  address: String,
  features: Array,
  averageRating: Number
  });

  
  const Property = mongoose.model("Property", propertySchema);
  
  
  module.exports = Property;