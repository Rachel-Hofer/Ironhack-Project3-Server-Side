const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const feedSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    image: String,
    message: String,
    likes: Number
  });

  
  const Feed = mongoose.model("Feed", feedSchema);
  
  
  module.exports = Feed;