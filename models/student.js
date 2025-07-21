"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var studentSchema = new mongoose_1.Schema({
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
var Student = mongoose_1.default.model("Student", studentSchema);
exports.default = Student;
