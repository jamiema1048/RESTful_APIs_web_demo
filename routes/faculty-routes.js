"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
// 首頁
router.get("/", function (req, res) {
    return res.send("Welcome to faculty page.....");
});
// 新增頁面
router.get("/new", function (req, res) {
    return res.send("Add new faculty page.....");
});
exports.default = router;
