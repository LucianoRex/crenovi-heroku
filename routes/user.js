const router = require("express").Router();
const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  chekRole,
  login,
  readUsers,
  chekRoles,
  register,
  registerUpdate
} = require("./../utils/auth");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
var async = require("async");
var crypto = require("crypto");
const User = require("../models/user");
//var flash = require("express-flash");
router.post("/authenticate", async (req, res, next) => {
  await login(req.body, res);
});

/*router.post(
  "/register-user",
  // userAuth,
  // chekRole(["admin"]),
  async (req, res, next) => {
    await userRegister(req.body, "user", res);
  }
);
*/
router.post(
  "/register",
  userAuth,
  chekRoles(["superadmin"]),
  async (req, res, next) => {
    await register(req.body, res);
  }
);

router.put(
  "/register/:_id",
  userAuth,
  chekRoles(["superadmin"]),
  async (req, res, next) => {
    await registerUpdate(req, res);
  }
);
/*
router.post("/forgot", (req, res, next) => {
  var remetente = nodemailer.createTransport({
    host: "",
    service: "Gmail",
    port: 587,
    secure: true,
    auth: {
      user: "lucianor3x@gmail.com",
      pass: "Tec2019!",
    },
  });
  var emailASerEnviado = {
    from: "lucianor3x@gmail.com",
    to: "lr002047@cfjl.com.br",
    subject: "Enviando Email com Node.js",
    text: "Estou te enviando este email com node.js",
  };
  remetente.sendMail(emailASerEnviado, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email enviado com sucesso.");
    }
  });
});
*/

/*router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});
*/
/*
router.post("/login-user", async (req, res, next) => {
  await userLogin(req.body, "user", res);
});
*/

/*
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});
*/

router.post("/recover", function (req, res, next) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res.status(500).json({
          message: "O E-mail " + req.body.email + " Não está cadastrado",
        });

      //Generate and set password reset token
      user.generatePasswordReset();

      // Save the updated user object
      user
        .save()
        .then((user) => {
          // send email
          let link =
            "http://" +
            req.headers.host +
            "/api/users/reset/" +
            user.resetPasswordToken;

          var remetente = nodemailer.createTransport({
            host: "",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
              user: "lucianor3x@gmail.com",
              pass: "Tec2019!",
            },
          });
          var emailASerEnviado = {
            from: "lucianor3x@gmail.com",
            to: user.email,
            subject: "Resetar Senha",
            text: `Estou te enviando este email para você resetar sua senha. Link
             ${link}`,
          };

          remetente.sendMail(emailASerEnviado, function (error) {
            if (error) {
              res.status(500).json({ message: error.message });
            } else {
              res.status(200).json({
                message: "Um e-mail foi enviado para\n " + user.email + ".",
              });
              console.log("mail enviado com sucesso.");
            }
          });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.get("/reset/:token", function (req, res) {
  console.log(req.params.token);
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user)
        return res
          .status(401)
          .json({ message: "Prazo da senha está inválido ou expirado" });

      //Redirect user to form with the email address
      res.render("reset", { user });
      //res.status(200).json({ message: user });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.post("/reset/:token", (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  }).then(async (user) => {
    if (!user)
      return res
        .status(401)
        .json({ message: "Password reset token is invalid or has expired." });

    //Set the new password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save
    user
      .save()
      .then((senha) => {
        return res.status(200).json({ message: "Senha atualizada" });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message });
      });
  });
});
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

router.get(
  "/user-protected",
  userAuth,
  chekRole(["user"]),
  async (req, res) => {
    return res.json(serializeUser(req.user));
  }
);

router.get("/users", userAuth, chekRoles(["superadmin"]), async (req, res) => {
  return readUsers(req, res);
});

module.exports = router;
