const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("SHOW ALL ANIMALS");
});
router.get("/:id", (req, res) => {
  res.send("SHOW ONE ANIMALS");
});
router.get("/:id/edit", (req, res) => {
  res.send("SHOW FORM TO EDIT ONE ANIMAL INFO");
});
router.get("/new", (req, res) => {
  res.send("SHOW FORM TO ADD NEW ANIMAL");
});

module.exports = router;
