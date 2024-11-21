const express = require("express");
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cookieParser = require('cookie-parser')

require("./config/config");

app.use(cookieParser())
app.use(express.json(), express.urlencoded({ extended: true }), cors({credentials: true, origin: 'http://localhost:5173'}));

const AllMyUserRoutes = require("./routes/user-routes");
AllMyUserRoutes(app);

const PostRoutes = require("./routes/post-routes");
PostRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );