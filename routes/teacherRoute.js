const express = require("express");

const router = express.Router();

const { addResult } = require("../controllers/teacherController");
const { deleteResult } = require("../controllers/teacherController");

const { validateAddingResult } = require("../middlewares/validationMiddleware");

router.post("/v1/api/assessments", validateAddingResult, addResult);

router.post("/v1/api/delete/assessment", deleteResult);

module.exports = router;
