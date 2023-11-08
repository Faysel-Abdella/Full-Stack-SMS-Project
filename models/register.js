const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const registerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
  },

  ID: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "Register",
  },

  phone: {
    type: String,
  },

  email: {
    type: String,
  },
});

module.exports = mongoose.model("Register", registerSchema);
