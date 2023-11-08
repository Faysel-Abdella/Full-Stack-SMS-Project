const { StatusCodes } = require("http-status-codes");

const Teacher = require("../models/teacher");
const Register = require("../models/student");

exports.addTeacher = async (req, res, next) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res
    .status(StatusCodes.CREATED)
    .json({ teacher: teacher, message: "Teacher successfully added." });
};

exports.addRegister = async (req, res, next) => {
  const register = new Register(req.body);
  await register.save();
  res
    .status(StatusCodes.CREATED)
    .json({ register: register, message: "Register successfully added." });
};
