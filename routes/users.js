const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/**
 * @route POST api/auth
 * @desc Register a use
 * @ccess public
 *
 */
router.post(
  "/",
  body("name", "your name doesn't existe ").notEmpty(),
  body("email", "err email").isEmail(),
  body("password", "err password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "user already exists" });
      user = new User({ name, email, password });

      //crypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server Error");
    }
  }
);

router.get(
  "/",

  async (req, res) => {
    try {
      let user = res.body;
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server Error");
    }
  }
);

module.exports = router;
