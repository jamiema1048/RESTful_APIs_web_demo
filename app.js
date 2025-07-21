"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var method_override_1 = require("method-override");
var path_1 = require("path");
var student_routes_1 = require("./routes/student-routes");
var app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, method_override_1.default)("_method"));
app.use("/students", student_routes_1.default);
mongoose_1.default
    .connect("mongodb://localhost:27017/exampleDB")
    .then(function () { return console.log("Connected to MongoDB"); })
    .catch(function (err) { return console.error(err); });
app.use(function (err, req, res, next) {
    console.error("Error middleware:", err);
    return res.status(400).render("error");
});
app.listen(1140, function () {
    console.log("Server is listening on port 1140...");
});
