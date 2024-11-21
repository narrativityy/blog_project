const User = require('../models/user-model');
const bcrypt = require('bcrypt');

module.exports.findAllUsers = (req, res) => {
    User.find()
        .then((allDaUsers) => {
            res.json(allDaUsers)
        })
        .catch((err) => {
            res.json(err)
        });
}
 
module.exports.findOneSingleUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(oneSingleUser => {
            res.json(oneSingleUser)
        })
        .catch((err) => {
            res.json(err)
        });}
 
module.exports.createNewUser = (req, res) => {
    const { username, email } = req.body
    User.findOne({ $or: [{ username }, { email }] })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            User.create(req.body)
                .then(newlyCreatedUser => {
                    res.json(newlyCreatedUser)
                })
                .catch((err) => {
                    res.status(400).json(err)
                });
        })
        .catch((err) => {
            res.status(400).json(err)
        });}
 
module.exports.updateExistingUser = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedUser => {
            res.json(updatedUser)
        })
        .catch((err) => {
            res.json(err)
        });}
 
module.exports.deleteAnExistingUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        });}

module.exports.registerUser = (req, res) => {
    const { username, email } = req.body
    User.findOne({ $or: [{ username }, { email }] })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            User.create(req.body)
                .then(newlyCreatedUser => {
                    res.status(200).json( { message: "Registration successful" } )
                })
                .catch((err) => {
                    res.status(400).json(err)
                });
        })
        .catch((err) => {
            res.status(400).json(err)
        });}

module.exports.loginUser = (req, res) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            // Compares the password from the request with the hashed password from the database
            const isValidPassword = bcrypt.compareSync(req.body.passwordHash, user.passwordHash);

            if (!isValidPassword) {
                return res.status(400).json({ message: "Incorrect credentials" });
            }
            res.status(200).json({ message: "Login successful" });
        })
        .catch(err => {
            res.status(400).json(err);
        });}