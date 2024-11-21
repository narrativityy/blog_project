const Post = require('../models/post-model');
const User = require('../models/user-model');
const bcrypt = require('bcrypt');

module.exports.findAllPosts = (req, res) => {
    Post.find()
        .then((allDaPosts) => {
            res.json(allDaPosts)
        })
        .catch((err) => {
            res.json(err)
        });
}
 
module.exports.findOneSinglePost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(oneSinglePost => {
            res.json(oneSinglePost)
        })
        .catch((err) => {
            res.json(err)
        });}
 
module.exports.createNewPost = (req, res) => {
    User.findOne({ _id: req.body.userId })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            req.body.user = user
            Post.create(req.body)
                .then(newlyCreatedPost => {
                    res.json(newlyCreatedPost)
                })
                .catch((err) => {
                    res.status(400).json(err)
                });
        })
        .catch((err) => {
            res.status(400).json(err)
        });
}
 
module.exports.updateExistingPost = (req, res) => {
    Post.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedPost => {
            res.json(updatedPost)
        })
        .catch((err) => {
            res.json(err)
        });
}
 
module.exports.deleteAnExistingPost = (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        });}