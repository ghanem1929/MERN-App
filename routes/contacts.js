const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const auth = require("../middleware/auth");
const Contact = require("../models/contacts");
dotenv.config();

/**
 * @route GET api/contacts
 * @desc get all users contacts
 * @ccess private
 *
 */
router.post(
  "/",
  auth,
  body("name", "Name is required").notEmpty(),
  body("email", "Email not valid").isEmail(),
  async (req, res) => {
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, phone, name, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {}
  }
);

/**
 * @route POST api/contacts
 * @desc add new contact
 * @ccess private
 *
 */
router.get("/", (req, res) => {
  res.send("all contacts");
});

/**
 * @route PUT api/contacts/:id
 * @desc update contact
 * @ccess private
 *
 */
router.put("/:id", (req, res) => {
  res.send("update contact works well");
});

/**
 * @route DELETE api/contacts/:id
 * @desc delete contact
 * @ccess private
 *
 */
router.delete("/:id", (req, res) => {
  res.send("delete contact works well");
});

module.exports = router;
