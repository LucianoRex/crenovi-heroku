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
} = require("./../utils/auth");

router.post("/authenticate", async (req, res, next) => {
  await login(req.body, res);
});

router.post(
  "/register-user",
 // userAuth,
 // chekRole(["admin"]),
  async (req, res, next) => {
    await userRegister(req.body, "user", res);
  }
);

router.post(
  "/register",
  userAuth,
  chekRoles(["admin,superadmin"]),
  async (req, res, next) => {
    await register(req.body, res);
  }
);

router.post("/register-super-admin", async (req, res) => {
  await userRegister(req.body, "superadmin", res);
});

router.post("/login-user", async (req, res, next) => {
  await userLogin(req.body, "user", res);
});

router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

router.get("/profile", userAuth, async (req, res) => {
  console.log(req.user.username);
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

router.get("/users", userAuth, chekRoles(["user,admin"]), async (req, res) => {
  return readUsers(req, res);
});

module.exports = router;
