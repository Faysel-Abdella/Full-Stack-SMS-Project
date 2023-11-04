const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
    default: "Student",
  },

  class: {
    type: String,
    required: true,
  },

  // The teacher will fill the following data
  result: [
    {
      subjectName: {
        type: String,
        enum: [
          "Maths",
          "English",
          "History",
          "Geography",
          "Biology",
          "Physics",
          "Chemistry",
        ],
      },
      results: [
        {
          name: String, // Assessment Name
          score: Number,
          outOf: Number,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
