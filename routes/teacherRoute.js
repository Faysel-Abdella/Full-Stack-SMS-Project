const express = require("express");

const router = express.Router();

const { addResult } = require("../controllers/teacherController");

const { validateAddingResult } = require("../middlewares/validationMiddleware");

router.post("/v1/api/assessments", validateAddingResult, addResult);

module.exports = router;
