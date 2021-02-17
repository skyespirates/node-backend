const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

router.get("/", async (req, res) => {
  const todo = await Todo.find({});
  res.send(todo);
});
router.get("/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.send(todo);
});
router.post("/", async (req, res) => {
  const todo = new Todo(req.body);
  const todos = await todo.save();
  res.send(todos);
});
router.put("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
  await todo.save();
  res.redirect(`/todos/${req.params.id}`);
});
router.delete("/:id", async (req, res) => {
  const todo = await Todo.findOneAndDelete(req.params.id);
  res.redirect("/todos");
});

module.exports = router;
