// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
var bodyParser = require("body-parser");
const path = require("path");
const url = require("url");
//require("./config");

const app = express();
//var serverSocketIO = require("http").createServer(app);

//var server = require("http").createServer(app);

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
require("./models/rotinaDiaria");
require("./models/norma");

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

var io = require("socket.io")(server);

const routes = require("./routes/convenio");
const acolhimento = require("./routes/acolhimento");
const grupoTerapeutico = require("./routes/grupoTerapeutico");
const livroDiario = require("./routes/livroDiario");
const rotinaDiaria = require("./routes/rotinaDiaria");
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
console.log(process);
app.use(
  cors({
    origin: "*", //process.env.BASE_URL || "http://localhost:4200",
    methods: ["GET", "PUT", "POST"],
  })
);

io.of("/acolhimento").on("connection", (socket) => {
  console.log("Cheou acolhimento");
  socket.on("livrodiario", (data) => {
    console.log("Cheou Livro");
    io.emit("livrodiario", { data: data });
    socket.off = socket.removeAllListeners("livrodiario");
  });
  socket.on("rotinadiaria", (data) => {
    io.emit("rotinadiaria", { data: data });
    socket.off = socket.removeAllListeners("rotinadiaria");
  });
});

io.of("/prontuario").on("connection", (socket) => {
  socket.on("livrodiario", (data) => {
    io.emit("livrodiario", { data: data });
    // socket.off = socket.removeAllListeners("livrodiario");
  });
  socket.on("avaliacao", (data) => {
    io.emit("avaliacao", { data: data });
    socket.off = socket.removeAllListeners("avaliacao");
  });
  socket.on("biometria", (data) => {
    io.emit("biometria", { data: data });
    socket.off = socket.removeAllListeners("biometria");
  });
  socket.on("psicoterapia", (data) => {
    io.emit("psicoterapia", { data: data });
    socket.off = socket.removeAllListeners("psicoterapia");
  });
  socket.on("saida", (data) => {
    io.emit("saida", { data: data });
    socket.off = socket.removeAllListeners("saida");
  });
  socket.on("agendamentoconsulta", (data) => {
    io.emit("agendamentoconsulta", { data: data });
    socket.off = socket.removeAllListeners("agendamentoconsulta");
  });
  socket.on("identificacao", (data) => {
    console.log("IDe");
    io.emit("identificacao", { data: data });
    // socket.off = socket.removeAllListeners("identificacao");
  });
});

/*io.on("disconnect", () => {
  console.log("saiu");
});
*/
// HTTP request logger
app.use(morgan("tiny"));
app.use("/api/convenio", routes);
app.use("/api/acolhimento", acolhimento);
app.use("/api/users", user);
app.use("/api/grupoterapeutico", grupoTerapeutico);
app.use("/api/colaborador", colaborador);
app.use("/api/substancia", substancia);
app.use("/api/livrodiario", livroDiario);
app.use("/api/acolhimento/rotinadiaria", rotinaDiaria);
app.use("/api/comunidade", comunidade);
//app.use("/api/medicamento", medicamento);
app.use("/api/busca", busca);

const prontuarioDocs = ["biometria", "avalicao"];

/*io.on("connection", function (socket) {
  
  socket.on("acolhimento", function (data) {
    console.log("Data" + data);
    io.emit("acolhimento", { data: data });
    // socket.disconnect();
  });
  socket.on("disconnect", function (data) {
    console.log("Desconnectar");
    socket.disconnect();
  });
});
*/

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//app.listen(PORT, console.log(`Server is starting at ${PORT}`));
