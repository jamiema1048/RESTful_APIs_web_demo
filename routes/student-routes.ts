import express, { Request, Response, NextFunction } from "express";
import Student, { IStudent } from "../models/student"; // 不要再自己定義 Student 或 schema
import { Document } from "mongoose";

const router = express.Router();

// Get all students
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentData: IStudent[] = await Student.find({});
    return res.render("students", { studentData });
  } catch (err) {
    next(err);
  }
});

// Get one student by ID
router.get("/:_id", async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;
  try {
    const foundStudent = await Student.findOne({ _id }).exec();
    if (foundStudent) {
      return res.render("studentPage", { foundStudent });
    } else {
      return res.status(400).render("error");
    }
  } catch (err) {
    next(err);
  }
});

// Edit form for student
router.get(
  "/:_id/edit",
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    try {
      const foundStudent = await Student.findOne({ _id }).exec();
      if (foundStudent) {
        return res.render("edit-student", { foundStudent });
      } else {
        return res.status(400).render("error");
      }
    } catch (err) {
      next(err);
    }
  }
);

// New student form
router.get("/new", (req: Request, res: Response) => {
  return res.render("new-student-form");
});

// Create new student
router.post("/", async (req: Request, res: Response) => {
  try {
    const { studentID, name, age, merit, other } = req.body;
    const newStudent = new Student({
      studentID,
      name,
      age,
      scholarship: {
        merit,
        other,
      },
    });
    const savedStudent = await newStudent.save();
    return res.render("student-saved", { savedStudent });
  } catch (err) {
    return res.status(400).render("student-saved-failed.ejs");
  }
});

// PUT - update entire student
router.put("/:_id", async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { studentID, name, age, merit, other } = req.body;
    const newData = await Student.findOneAndUpdate(
      { _id },
      { studentID, name, age, scholarship: { merit, other } },
      {
        new: true,
        runValidators: true,
        overwrite: true,
      }
    );
    return res.render("student-edited", { newData });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Custom patch helper class
class NewData {
  [key: string]: any; // 允許動態 key 存取

  constructor() {}

  setProperty(key: string, value: any): void {
    if (key !== "merit" && key !== "other") {
      this[key] = value;
    } else {
      this[`scholarship.${key}`] = value;
    }
  }
}

// PATCH - partial update
router.patch("/:_id", async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const newObject = new NewData();
    for (const property in req.body) {
      newObject.setProperty(property, req.body[property]);
    }

    const newData = await Student.findByIdAndUpdate({ _id }, newObject, {
      new: true,
      runValidators: true,
    });

    return res.send({ msg: "Data updated.....", updatedData: newData });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// DELETE - remove a student
router.delete("/:_id", async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const deleteResult = await Student.deleteOne({ _id });
    return res.send(deleteResult);
  } catch (err) {
    return res.status(500).send("Failed to delete data.....");
  }
});

export default router;
