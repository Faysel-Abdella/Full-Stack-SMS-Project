const express = require("express");

const router = express.Router();

const { addStudent } = require("../controllers/registerController");

const {
  validateAddingStudent,
} = require("../middlewares/validationMiddleware");

router.post("/v1/api/students", validateAddingStudent, addStudent);

module.exports = router;
