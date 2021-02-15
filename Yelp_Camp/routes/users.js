const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("users/register");
});
router.post("/register", async (req, res) => {
  res.send("register");
});
router.get("/login", (req, res) => {
  res.render("users/login");
});
router.post("/login", async (req, res) => {
  res.send("login");
});

module.exports = router;
