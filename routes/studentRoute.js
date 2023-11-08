const express = require("express");

const router = express.Router();

const { seeResult } = require("../controllers/studentController");

router.post("/v1/api/results", seeResult);

module.exports = router;
