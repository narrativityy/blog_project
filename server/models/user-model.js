const mongoose = require('mongoose');
 
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [4, "{PATH} must be at least 4 chars {VALUE}"]
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
}, {timestamps: true});
 
const User = mongoose.model('User', UserSchema);
 
module.exports = User;