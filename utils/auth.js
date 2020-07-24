const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
var cfg = require("../config/index");

const userRegister = async (userDets, role, res) => {
  try {
    let usernameNotTaken = await validateUserName(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: "Usuário já existe",
        success: false,
      });
    }

    let emailNotRegister = await validateEmail(userDets.email);

    if (!emailNotRegister) {
      return res.status(400).json({
        message: "Email já existe",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(userDets.password, 12);
    const newUser = new User({
      ...userDets,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return res.json(200).json({
      message: "Usuário Criado",
      success: true,
    });
  } catch (error) {    
    return res.status(500).json({
      message: "Erro",
      success: false,
    });
  }
};

const register = async (userDets, res) => {  
  try {
    let usernameNotTaken = await validateUserName(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: "Usuário já existe",
        success: false,
      });
    }

    let emailNotRegister = await validateEmail(userDets.email);

    if (!emailNotRegister) {
      return res.status(400).json({
        message: "Email já existe",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(userDets.password || "1234", 12);
    const newUser = new User({
      ...userDets,
      password: hashedPassword,
    });
    await newUser.save();
    return res.json(200).json({
      message: "Usuário Criado",
      success: true,
    });
  } catch (error) {    
    return res.status(500).json({
      message: "Erro",
      success: false,
    });
  }
};

const registerUpdate = async (userDets, res) => {
  try {    
    User.findOneAndUpdate(
      { _id: userDets.params._id },
      {
        $set: userDets.body,
      },
      {
        $upsert: true,
      }
    )
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
          success: false,
        });
      });
  } catch (error) {    
    return res.status(500).json({
      message: "Erro",
      success: false,
    });
  }
};

const login = async (userCreds, res) => {
  let { username, password } = userCreds;

  const user = await User.findOne({ username }).populate("colaborador");  
  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado",
      success: false,
    });
  }

  let isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
        nome: user.nome,
      },
      cfg.jwtSecret,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      nome: user.nome,
      colaborador: user.colaborador || "",
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      message: "Autorizado",
      success: true,
    });
  } else {
    return res.status(404).json({
      message: "Senha Incorrta",
      success: false,
    });
  }
};

const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado",
      success: false,
    });
  }

  if (user.role != role) {
    return res.status(404).json({
      message: "Regras",
      success: false,
    });
  }
  let isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      cfg.jwtSecret,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      message: "Autorizado",
      success: true,
    });
  } else {
    return res.status(404).json({
      message: "Senha Incorrta",
      success: false,
    });
  }
};

const validateUserName = async (username) => {
  let user = await User.findOne({ username });  
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const userAuth = passport.authenticate("jwt", { session: false });

const chekRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json({ message: "Não Autorizado", success: false })
    : next();

const chekRoles = (roles) => (req, res, next) =>
  !roles.indexOf(req.user.role) == -1
    ? res.status(401).json({ message: "Não Autorizado", success: false })
    : next();

const serializeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    nome: user.nome,
    _id: user._id,
    role: user.role,
  };
};

const readUsers = (req, res) => {
  const user = User.find()
    .populate("colaborador.colaborador")
    .then((user) => {
      return res.status(200).json(user);
    });
  // console.log(user)
};

module.exports = {
  userRegister: userRegister,
  userLogin: userLogin,
  userAuth: userAuth,
  serializeUser: serializeUser,
  chekRole: chekRole,
  login: login,
  readUsers: readUsers,
  chekRoles: chekRoles,
  register: register,
  registerUpdate: registerUpdate,
};
