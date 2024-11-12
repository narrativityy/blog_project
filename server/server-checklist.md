# Checklist

1. mkdir server
2. cd server
2. touch server.js .env .gitignore
3. npm init -y
4. npm install express dotenv cors mongoose
5. mkdir config controllers models routes

# Boiler Plate

## .gitignore
```
/node_modules
.env
```

## .env
```
PORT=8001
DB=my_db
# mongo atlas connection
ATLAS_USERNAME=YOUR_ATLAS_USERNAME
ATLAS_PASSWORD=YOUR_ATLAS_PASSWORD
```

## server.js

```
const express = require("express");
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT;

require("./config/config");

app.use(express.json(), express.urlencoded({ extended: true }), cors());

const AllMyTemplateRoutes = require("./routes/routes");
AllMyTemplateRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );
```

## config.js
```
const mongoose = require('mongoose');
const dbName = process.env.DB;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;
const uri = `mongodb+srv://${username}:${pw}@TEMPLATE-URL/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri)
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log(`📡📡📡📡 Something went wrong when connecting to the ${dbName} database`, err));
```

## model.js
```
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
```

## controller.js
```
const Template = require('../models/template');
 
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
```

## routes.js
```
const TemplateController = require('../controllers/controller');
 
module.exports = app => {
    app.get('/api/templates', TemplateController.findAllTemplates);
    app.get('/api/templates/:id', TemplateController.findOneSingleTemplate);
    app.patch('/api/templates/:id', TemplateController.updateExistingTemplate);
    app.post('/api/templates', TemplateController.createNewTemplate);
    app.delete('/api/templates/:id', TemplateController.deleteAnExistingTemplate);
}
```