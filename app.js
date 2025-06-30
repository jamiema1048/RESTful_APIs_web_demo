const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const studentRoutes = require("./routes/student-routes");
const facultyRoutes = require("./routes/faculty-routes");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/students", studentRoutes);
app.use("/faculty", facultyRoutes);

mongoose
  .connect("mongodb://localhost:27017/exampleDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use((err, req, res, next) => {
  console.log("conducting this Middleware.....");
  return res.status(400).render("error");
});

app.listen(1140, () => {
  console.log("Server is listening port 1140......");
});
