const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// DATABASE
require("./models/User");
mongoose.connect("mongodb://admin:admin@ds125388.mlab.com:25388/secure-api-jwt");

// BODY PARSER
app.use(bodyParser.json());

// ROUTERS
require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);

// SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});