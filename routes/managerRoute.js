const express = require("express");

const router = express.Router();

const { addTeacher } = require("../controllers/managerController");

const {
  validateAddingTeacher,
} = require("../middlewares/validationMiddleware");

router.post("/v1/api/teachers", validateAddingTeacher, addTeacher);

module.exports = router;
