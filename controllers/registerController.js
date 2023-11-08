const { StatusCodes } = require("http-status-codes");

const Student = require("../models/student");

const bcrypt = require("bcryptjs");

exports.addStudent = async (req, res, next) => {
  const studentData = req.body;
  const password = studentData.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  studentData.password = hashedPassword;
  const student = new Student(studentData);

  await student.save();

  res
    .status(StatusCodes.CREATED)
    .json({ student: student, message: "Successfully added." });
};
