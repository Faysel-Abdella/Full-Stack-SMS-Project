const { body, validationResult } = require("express-validator");

const { StatusCodes } = require("http-status-codes");

const Student = require("../models/student");
const Teacher = require("../models/teacher");

const allowedClass = ["6A", "7A", "8A"];
const allowedSubjects = [
  "Maths",
  "English",
  "History",
  "Geography",
  "Biology",
  "Physics",
  "Chemistry",
];
const allowedGender = ["M", "F"];
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const withValidatorErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      const errorArray = errors.array();
      if (!errors.isEmpty()) {
        const errorMessages = errorArray.map((error) => error.msg);
        const error = new Error(errorMessages);
        error.statusCode = StatusCodes.BAD_REQUEST;
        if (errorMessages[0].startsWith("no student")) {
          error.statusCode = StatusCodes.NOT_FOUND;
        }
        throw error;
      }
      next();
    },
  ];
};

exports.validateAddingStudent = withValidatorErrors([
  body("name").notEmpty().withMessage("Name is required"),

  body("gender").notEmpty().withMessage("Gender is required"),

  body("ID")
    .notEmpty()
    .withMessage("ID is required")
    .trim()
    //check if there is a student with the same ID
    .custom(async (value) => {
      const student = await Student.findOne({ ID: value });
      if (student) {
        throw new Error(
          "Student with the same ID already exist, please use another ID"
        );
      }
    }),

  body("password")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("At least 5 characters password is required")
    .trim(),

  body("class")
    .notEmpty()
    .withMessage("Student class is required")
    .trim()
    .custom(async (value) => {
      if (!allowedClass.includes(value)) {
        throw new Error("Invalid class ");
      }
    }),
]);

exports.validateAddingTeacher = withValidatorErrors([
  body("name").notEmpty().withMessage("Name is required"),

  body("gender").notEmpty().withMessage("Gender is required"),

  body("ID")
    .notEmpty()
    .withMessage("ID is required")
    .trim()
    //check if there is a Teacher with the same ID
    .custom(async (value) => {
      const teacher = await Teacher.findOne({ ID: value });
      if (teacher) {
        throw new Error(
          "Teacher with the same ID already exist, please use another ID"
        );
      }
    }),

  body("password")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("At least 5 characters password is required")
    .trim(),

  body("teaching_subjects")
    .notEmpty()
    .withMessage("Teaching subjects is required")
    .trim()
    .custom(async (value) => {
      if (!allowedSubjects.includes(value)) {
        throw new Error("Invalid subject");
      }
    }),

  body("teaching_classes")
    .notEmpty()
    .withMessage("Teaching classes is required")
    .trim()
    .custom(async (value) => {
      if (!allowedClass.includes(value)) {
        throw new Error("Invalid class");
      }
    }),
]);
