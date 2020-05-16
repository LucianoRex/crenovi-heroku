// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
var bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Step 2
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/crenovi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

const routes = require("./routes/convenio");
const acolhimento = require("./routes/acolhimento");

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  'origin': '*'
}));
// Step 3

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// HTTP request logger
app.use(morgan("tiny"));
app.use("/convenio", routes);
app.use("/acolhimento", acolhimento);

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//app.listen(PORT, console.log(`Server is starting at ${PORT}`));
