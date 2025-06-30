const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.get("/", async (req, res, next) => {
  try {
    let studentData = await Student.find({}).exec();
    // return res.send(studentData);
    return res.render("students", { studentData });
  } catch (err) {
    next(err);
    // return res.status(500).send("An error occurs when finding data.....");
  }
});

router.get("/:_id", async (req, res, next) => {
  let { _id } = req.params;
  try {
    let foundStudent = await Student.findOne({ _id }).exec();
    // return res.send(foundStudent);
    if (foundStudent != null) {
      return res.render("studentPage", { foundStudent });
    } else {
      return res.status(400).render("error");
    }
  } catch (err) {
    // return res.status(400).render("error");
    next(err);
  }
});

router.get("/:_id/edit", async (req, res, next) => {
  let { _id } = Student.findOne({ _id });
  try {
    let foundStudent = await Student.findOne({ _id }).exec();
    // return res.send(foundStudent);
    if (foundStudent != null) {
      return res.render("edit-student", { foundStudent });
    } else {
      return res.status(400).render("error");
    }
  } catch (err) {
    // return res.status(400).render("error");
    next(err);
  }
});

router.get("/new", async (req, res) => {
  return res.render("new-student-form");
});

router.post("/", async (req, res) => {
  try {
    let { studentID, name, age, merit, other } = req.body;
    let newStudent = new Student({
      studentID,
      name,
      age,
      scholarship: {
        merit,
        other,
      },
    });
    let savedStudent = await newStudent.save();
    return res.render("student-saved", { savedStudent });
  } catch (err) {
    return res.status(400).render("student-saved-failed.ejs");
  }
});

router.put("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { studentID, name, age, merit, other } = req.body;
    let newData = await Student.findOneAndUpdate(
      { _id },
      { studentID, name, age, scholarship: { merit, other } },
      {
        new: true,
        runValidators: true,
        overwrite: true, //覆蓋所有數據
        //HTTP的PUT req就是要求client提供所有數據
        //我們需要根據client提供的數據，來更新資料庫內的資料
      }
    );
    // return res.send({ msg: "Data updated.....", updatedData: newData });
    return res.render("student-edited", { newData });
  } catch (err) {
    return res.status(400).send(err);
  }
});

class NewData {
  constructor() {}
  setProperty(key, value) {
    if (key !== "merit" && key !== "other") {
      this[key] = value;
    } else {
      this[`scholarship.${key}`] = value;
    }
  }
}

router.patch("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let newObject = new NewData();
    for (let property in req.body) {
      newObject.setProperty(property, req.body[property]);
    }
    let newData = await Student.findByIdAndUpdate({ _id }, newObject, {
      new: true,
      runValidators: true,
      // 不能寫overwrite: true
    });
    return res.send({ msg: "Data updated.....", updatedData: newData });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let deleteResult = await Student.deleteOne({ _id });
    return res.send(deleteResult);
  } catch (err) {
    return res.status(500).send("Failed to delete data.....");
  }
});

module.exports = router;
