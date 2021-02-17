const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.send(user);
});
router.post("/", async (req, res) => {
  const users = new User(req.body);
  await users.save();
  res.redirect("/users");
});
router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  await user.save();
  res.redirect("/users");
});
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.redirect("/users");
});

module.exports = router;
