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
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    user: {
        type: Object,
        required: true
    },
}, {timestamps: true});

 
const Post = mongoose.model('Post', PostSchema);
 
module.exports = Post;