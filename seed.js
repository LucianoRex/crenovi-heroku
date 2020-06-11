const bcrypt = require("bcryptjs");
const User = require("./models/user");


User.findOne({ role: "superadmin" }).then(async (user) => {
  if (!user) {
    const hashedPassword = await bcrypt.hash('superadmin', 12);
    User.create(new User({
        nome: "Luciano Rex",
        email: "lucianor3x@gmail.com",
        password: hashedPassword,
        role: "superadmin",
        username: "luciano.rex",
      }))
  } else {
    console.log("user"); 
  }
});
