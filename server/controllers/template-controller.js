const Template = require('../models/template-model');
 
module.exports.findAllTemplates = (req, res) => {
    Template.find()
        .then((allDaTemplates) => {
            res.json(allDaTemplates)
        })
        .catch((err) => {
            res.json(err)
        });
}
 
module.exports.findOneSingleTemplate = (req, res) => {
    Template.findOne({ _id: req.params.id })
        .then(oneSingleTemplate => {
            res.json(oneSingleTemplate)
        })
        .catch((err) => {
            res.json(err)
        });}
 
module.exports.createNewTemplate = (req, res) => {
    Template.create(req.body)
        .then(newlyCreatedTemplate => {
            res.json(newlyCreatedTemplate)
        })
        .catch((err) => {
            res.status(400).json(err)
        });}
 
module.exports.updateExistingTemplate = (req, res) => {
    Template.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedTemplate => {
            res.json(updatedTemplate)
        })
        .catch((err) => {
            res.json(err)
        });}
 
module.exports.deleteAnExistingTemplate = (req, res) => {
    Template.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        });}