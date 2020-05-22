// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
var bodyParser = require("body-parser");
const path = require("path");

const app = express();
var serverSocketIO = require("http").createServer(app);
var io = require("socket.io")(serverSocketIO);
serverSocketIO.listen(4000);
//var server = require("http").createServer(app);

app.use(bodyParser.json());
console.log(process)

// Step 2
mongoose.connect(process.env.MONGODB_URI || /*"mongodb://lucianor3x:Tec2019!@ds213529.mlab.com:13529/crenovi"*/"mongodb://localhost/crenovi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

require("./models/doenca");
require("./models/medicamento");
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

io.on("connection", function (socket) {
  socket.on("updatedata", function (data) {
    io.emit("update-data", { data: data });
  });
});

const routes = require("./routes/convenio");
const acolhimento = require("./routes/acolhimento");
//const medicamento = require("./routes/medicamento");
//const doenca = require("./routes/");
const busca = require("./routes/busca");

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);
// Step 3

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// HTTP request logger
app.use(morgan("tiny"));
app.use("/api/convenio", routes);
app.use("/api/acolhimento", acolhimento);
//app.use("/api/medicamento", medicamento);
app.use("/api/busca", busca);

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//app.listen(PORT, console.log(`Server is starting at ${PORT}`));
