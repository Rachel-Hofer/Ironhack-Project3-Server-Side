const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const propertySchema = new Schema({
  image: String,
  address: String,
  features: String,
  review: {type: [Schema.Types.ObjectId], ref: 'Review'},
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  averageRating: Number,
  zipCode: String,
  latLong: Object
  });


  const Property = mongoose.model("Property", propertySchema);


  module.exports = Property;