const mongoose = require('mongoose');
 
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [4, "{PATH} must be at least 4 chars {VALUE}"]
    },
    body: {
        type: String,
        required: true,
    },
    user: {
        type: Object,
        required: true
    },
}, {timestamps: true});

 
const Post = mongoose.model('Post', PostSchema);
 
module.exports = Post;