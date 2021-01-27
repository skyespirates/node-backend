const express = require("express");
const app = express();

app.set("view engine", "ejs");

const PORT = 8080;

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send({ users: { id } });
});
app.get("/todos", (req, res) => {
  const { id, todo } = req.query;
  res.send({ todos: { id, todo } });
});

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
