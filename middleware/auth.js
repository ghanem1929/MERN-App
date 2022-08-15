const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (res, req, next) => {
  //get token from header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token)
    return res.status(401).json({ mag: "not token authorization denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
  }
};
