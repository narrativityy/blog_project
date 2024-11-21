const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 
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

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.passwordHash, 10)
      .then(hash => {
        this.passwordHash = hash;
        next();
      })
      .catch(err => {
        console.log(err)
      });
  });
 
const User = mongoose.model('User', UserSchema);
 
module.exports = User;