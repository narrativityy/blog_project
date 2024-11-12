const mongoose = require('mongoose');
 
const TemplateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, "{PATH} must be at least 3 chars {VALUE}"]
    },
    content: {
        type: String
    },
    isImportant: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});
 
const Template = mongoose.model('Template', TemplateSchema);
 
module.exports = Template;