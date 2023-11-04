const express = require("express");

const router = express.Router();

const { addStudent } = require("../controllers/studentController");

const {
  validateAddingStudent,
} = require("../middlewares/validationMiddleware");

router.post("/student/add-new", validateAddingStudent, addStudent);

module.exports = router;
