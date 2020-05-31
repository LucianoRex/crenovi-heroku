// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
var bodyParser = require("body-parser");
const path = require("path");
//require("./config");

const app = express();
//var serverSocketIO = require("http").createServer(app);

//var server = require("http").createServer(app);
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

// Step 2
mongoose.connect(
  process.env.MONGODB_URI ||
    /*"mongodb://lucianor3x:Tec2019!@ds213529.mlab.com:13529/crenovi"*/ "mongodb://localhost/crenovi",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

require("./models/doenca");
require("./models/medicamento");
require("./models/user");
require("./models/ocupacao");
require("./models/grupoTerapeutico");
require("./models/livroDiario");

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

var io = require("socket.io")(server);

io.on("connection", function (socket) {
  socket.on("updatedata", function (data) {
    console.log(data);
    io.emit("update-data", { data: data });
  });
});

const routes = require("./routes/convenio");
const acolhimento = require("./routes/acolhimento");
const grupoTerapeutico = require("./routes/grupoTerapeutico");
const livroDiario = require("./routes/livroDiario");
const user = require("./routes/user");
const colaborador = require("./routes/colaborador");
const comunidade = require("./routes/comunidade");
//const medicamento = require("./routes/medicamento");
const substancia = require("./routes/substancia");
//const doenca = require("./routes/");
const busca = require("./routes/busca");

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Step 3

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// HTTP request logger
app.use(morgan("tiny"));
app.use("/api/convenio", routes);
app.use("/api/acolhimento", acolhimento);
app.use("/api/users", user);
app.use("/api/grupoterapeutico", grupoTerapeutico);
app.use("/api/colaborador", colaborador);
app.use("/api/substancia", substancia);
app.use("/api/livrodiario", livroDiario);
app.use("/api/comunidade", comunidade);
//app.use("/api/medicamento", medicamento);
app.use("/api/busca", busca);

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//app.listen(PORT, console.log(`Server is starting at ${PORT}`));
