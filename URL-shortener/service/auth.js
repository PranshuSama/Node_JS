const jwt = require("jsonwebtoken");
const secret = "Pranshu$123@#";

function setUser(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    secret,
  );
}

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7).trim();
  }

  return req.cookies?.uid || null;
}

function getUser(token) {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getTokenFromRequest,
  getUser,
};
