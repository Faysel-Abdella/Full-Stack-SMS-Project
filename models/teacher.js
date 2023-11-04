const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
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
    default: "Teacher",
  },

  teaching_subjects: {
    type: [String], // An array of strings to store multiple subjects
    required: true, // Make the subjects field required
  },

  teaching_classes: {
    type: [String], // An array of strings to store multiple classes
  },

  phone: {
    type: String,
  },

  email: {
    type: String,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
