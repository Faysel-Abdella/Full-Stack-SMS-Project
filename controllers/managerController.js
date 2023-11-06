const { StatusCodes } = require("http-status-codes");

const Teacher = require("../models/teacher");

exports.addTeacher = async (req, res, next) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res
    .status(StatusCodes.CREATED)
    .json({ teacher: teacher, message: "Teacher successfully added." });
};
