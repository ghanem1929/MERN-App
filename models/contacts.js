const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    type: {
      type: String,
      default: "personel",
    },
  },
  {
    timestamps: true,
  }
);
const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;
