const bcrypt = require("bcryptjs");
const User = require("./models/user");
const Colaborador = require("./models/colaborador");

User.findOne({ role: "superadmin" }).then(async (user) => {
  if (!user) {
    const hashedPassword = await bcrypt.hash("superadmin", 12);
    User.create(
      new User({
        nome: "Luciano Rex",
        email: "lucianor3x@gmail.com",
        password: hashedPassword,
        role: "superadmin",
        username: "luciano.rex",
      })
    );
  } else {
    console.log("user");
  }
});

Colaborador.findOne({ nome: "Padrão" }).then(async (user) => {
  if (!user) {
    Colaborador.create(
      new User({
        nome: "Padrão",
      })
    );
  } else {
    console.log("Colaborador");
  }
});
