const express = require("express");
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cookieParser = require('cookie-parser')

require("./config/config");

app.use(cookieParser())
app.use(express.json(), express.urlencoded({ extended: true }), cors({credentials: true, origin: 'http://localhost:5173'}));

const AllMyTemplateRoutes = require("./routes/user-routes");
AllMyTemplateRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );