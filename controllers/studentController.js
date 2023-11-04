const { StatusCodes } = require("http-status-codes");

const Student = require("../models/student");

exports.addStudent = async (req, res, next) => {
  const student = new Student(req.body);
  await student.save();
  res
    .status(StatusCodes.CREATED)
    .json({ student: student, message: "Successfully added." });
};
