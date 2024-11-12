const express = require("express");
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT;

require("./config/template-config");

app.use(express.json(), express.urlencoded({ extended: true }), cors());

const AllMyTemplateRoutes = require("./routes/template-routes");
AllMyTemplateRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );