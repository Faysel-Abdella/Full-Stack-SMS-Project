require("express-async-errors");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
// For using variables from .env file we need "doenv" package
dotenv.config();
//For parsing json data(application/json) from incoming req we use the following
app.use(bodyParser.json());
app.use(express.json());

const studentRoute = require("./routes/studentRoute");
const teacherRoute = require("./routes/teacherRoute");

app.use(studentRoute);
app.use(teacherRoute);

app.get("/", (req, res, next) => {
  res.json({ message: "Hi, welcome" });
});

//General error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || "Something went error(error msg not passed)";
  res.status(statusCode).json({ message: message });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    app.listen(process.env.PORT || 8080, () => {
      console.log("Server running ... :)");
    });
  })
  .catch((err) => {
    console.log("Connecting to MongoDB error", err);
    process.exit(1);
  });
