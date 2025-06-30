const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send("Welcome to faculty page.....");
});

router.get("/new", (req, res) => {
  return res.send("Add new faculty page.....");
});

module.exports = router;
