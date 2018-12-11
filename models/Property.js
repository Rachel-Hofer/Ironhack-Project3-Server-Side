const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const propertySchema = new Schema({
  image: String,
  address: String,
  zipCode: Number,
  // {AddressLine1: String, AddressLine2: String, City: String, State: String, Country: String, ZipCode: Number},
  features: {type: [String], enum: ['lights', 'decorations', 'music', 'carolers', 'holiday beverages']},
  review: {type: [Schema.Types.ObjectId], ref: 'Review'},
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  averageRating: Number
  });


  const Property = mongoose.model("Property", propertySchema);


  module.exports = Property;