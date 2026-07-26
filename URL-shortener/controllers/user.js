const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleNewUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function handleNewUserLogin(req, res) {
  const { email, password } = req.body;
  const resut = await User.findOne({
    email,
    password,
  });

  if (!resut) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }
  const sessionId = uuidv4();
  setUser(sessionId, resut);
  res.cookie("uid", sessionId, { httpOnly: true });
  return res.redirect("/");
}

module.exports = {
  handleNewUserSignup,
  handleNewUserLogin,
};
