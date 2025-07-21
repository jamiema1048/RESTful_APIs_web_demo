import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStudent extends Document {
  studentID: number;
  name: string;
  age?: number;
  scholarship: {
    merit: number;
    other: number;
  };
}

const studentSchema: Schema<IStudent> = new Schema({
  studentID: { type: Number, required: true, min: 1 },
  name: { type: String, required: true, minlength: 1 },
  age: {
    type: Number,
    default: 18,
    max: [50, "Maybe too old....."],
    min: [5, "U still a baby....."],
  },
  scholarship: {
    merit: { type: Number, min: 0, max: 5000, default: 0 },
    other: { type: Number, min: 0, default: 0 },
  },
});

const Student: Model<IStudent> = mongoose.model<IStudent>(
  "Student",
  studentSchema
);
export default Student;
