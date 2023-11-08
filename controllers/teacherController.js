const { StatusCodes } = require("http-status-codes");

const Student = require("../models/student");

exports.addResult = async (req, res, next) => {
  const { studentId, subjectName, assessmentName, score, outOf } = req.body;

  try {
    const student = await Student.findOne({ ID: studentId });

    if (!student) {
      const error = new Error("Student Not Found when adding result");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    // Check if the subject exist in the student's result
    const subjectIndex = student.result.findIndex(
      (subject) => subject.subjectName === subjectName
    );

    if (subjectIndex !== -1) {
      // Check if the assessment name is already used in this subject
      const assessmentExists = student.result[subjectIndex].results.some(
        (assessment) => assessment.name === assessmentName
      );

      if (assessmentExists) {
        return res.status(400).json({
          message: "Assessment name must be unique within the subject",
        });
      }

      // Subject exists, update or add the new assessment
      const assessment = {
        name: assessmentName,
        score: score,
        outOf: outOf,
      };

      student.result[subjectIndex].results.push(assessment);
    } else {
      // Subject doesn't exist, create a new object with the subject and assessment
      const newSubject = {
        subjectName: subjectName,
        results: [
          {
            name: assessmentName,
            score: score,
            outOf: outOf,
          },
        ],
      };

      student.result.push(newSubject);
    }

    await student.save();

    res.status(StatusCodes.CREATED).json({
      student: student,
      message: "Assessment data updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteResult = async (req, res, next) => {
  const { studentId, subjectName, assessmentName } = req.body;

  if (!studentId || !subjectName || !assessmentName) {
    const error = new Error("Invalid credential");
    error.statusCode = StatusCodes.BAD_REQUEST;
    throw error;
  }

  try {
    const student = await Student.findOne({ ID: studentId });

    if (!student) {
      const error = new Error("Student Not Found when deleting result");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    // Find the subject
    const subjectIndex = student.result.findIndex(
      (subject) => subject.subjectName === subjectName
    );

    if (subjectIndex === -1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Subject Not Found" });
    }

    // Find the assessment and delete
    const assessmentIndex = student.result[subjectIndex].results.findIndex(
      (assessment) => assessment.name === assessmentName
    );

    if (assessmentIndex === -1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Assessment Not Found " });
    }

    student.result[subjectIndex].results.splice(assessmentIndex, 1);

    await student.save();

    res.status(StatusCodes.OK).json({
      result: student.result,
      message: "Assessment deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
