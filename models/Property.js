const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const propertySchema = new Schema({
  image: String,
  address: String,
  zipCode: Number,
  features: {type: [String], enum: ['lights', 'decorations', 'music', 'carolers', 'holiday beverages']},
  review: {type: [Schema.Types.ObjectId], ref: 'Review'},
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  averageRating: Number
  });

  
  const Property = mongoose.model("Property", propertySchema);
  
  
  module.exports = Property;