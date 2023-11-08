const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const Student = require("../models/student");

exports.seeResult = async (req, res, next) => {
  const { studentId, password } = req.body;

  if (!studentId || !password) {
    const error = new Error("Invalid credential");
    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }

  const student = await Student.findOne({ ID: studentId });

  if (!student) {
    const error = new Error("Student Not Found when looking to see result");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, student.password);

  if (!isMatch) {
    const error = new Error("Incorrect password");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  res
    .status(StatusCodes.OK)
    .json({ results: student.result, message: "Here is the student result" });
};
