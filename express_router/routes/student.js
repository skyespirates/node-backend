const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("SHOW ALL STUDENTS");
});
router.get("/:id", (req, res) => {
  res.send("SHOW ONE STUDENT");
});
router.get("/new", (req, res) => {
  res.send("SHOW NEW STUDENT FORM");
});
router.get("/:id/EDIT", (req, res) => {
  res.send("EDIT STUDENT INFO");
});

module.exports = router;
