const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const auth = require("../middleware/auth");

/**
 * @route POST api/auth
 * @desc Auth user and get token
 * @ccess public
 *
 */
router.post(
  "/",
  body("email", "plz include ur email").isEmail,
  body("password", "password is required").exists(),
  async (req, res) => {
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    console.log(req.body);

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      //get token to this user
      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server Error");
    }
  }
);

/**
 * @route GET api/auth
 * @desc Get logged in user
 * @ccess pivate
 *
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("server Error");
  }
});

module.exports = router;
