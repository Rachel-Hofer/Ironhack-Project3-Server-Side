const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;


const UserSchema  = ({
    
    

email: String,
password: String,
fullName: String,
image: String,
propertiesOwned: Array,
propertiesViewed: Array,
owner: Boolean


})



const User = mongoose.model('User', UserSchema);

module.exports = User;