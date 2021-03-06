// Import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
var bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: "*" }));
app.use(passport.initialize());

require("./middlewares/passport")(passport);
//app.use(flash());

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
 // console.log("Mongoose is connected!!!!");
});

require("./models/doenca");
require("./models/pertenceAcolhido");
require("./models/medicamento");
require("./models/user");
require("./models/ocupacao");
require("./models/grupoTerapeutico");
require("./models/livroDiario");
require("./models/rotinaDiaria");
require("./models/motivoSaida");
require("./models/norma");
require("./seed");

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
 // console.log("App now running on port", port);
});

var io = require("socket.io")(server);

const routes = require("./routes/convenio");
const acolhimento = require("./routes/acolhimento");
const pertenceAcolhido = require("./routes/pertenceAcolhido");
const prontuario = require("./routes/prontuario");
const acolhido = require("./routes/acolhido");
const grupoTerapeutico = require("./routes/grupoTerapeutico");
const procedimentoPsicologico = require("./routes/procedimentoPsicologico");
const motivoSaida = require("./routes/motivoSaida");
const tipoConsulta = require("./routes/tipoConsulta");
const livroDiario = require("./routes/livroDiario");
const rotinaDiaria = require("./routes/rotinaDiaria");
const user = require("./routes/user");
const colaborador = require("./routes/colaborador");
const comunidade = require("./routes/comunidade");
//const medicamento = require("./routes/medicamento");
const substancia = require("./routes/substancia");
//const doenca = require("./routes/");
const busca = require("./routes/busca");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// HTTP request logger
app.use(morgan("tiny"));
app.use("/api/convenio", routes);
app.use("/api/acolhimento", acolhimento);
app.use("/api/prontuario", prontuario);
app.use("/api/acolhido", acolhido);
app.use("/api/users", user);
app.use("/api/grupoterapeutico", grupoTerapeutico);
app.use("/api/colaborador", colaborador);
app.use("/api/substancia", substancia);
app.use("/api/livrodiario", livroDiario);
app.use("/api/procedimentopsicologico", procedimentoPsicologico);
app.use("/api/motivosaida", motivoSaida);
app.use("/api/tipoconsulta", tipoConsulta);
app.use("/api/pertenceacolhido", pertenceAcolhido);
app.use("/api/rotinadiaria", rotinaDiaria);
app.use("/api/comunidade", comunidade);
//app.use("/api/medicamento", medicamento);
app.use("/api/busca", busca);

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//app.listen(PORT, console.log(`Server is starting at ${PORT}`));
