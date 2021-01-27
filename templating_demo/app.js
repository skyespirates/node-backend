const express = require("express");
const app = express();
const path = require("path");
const data = require("./data.json");

const PORT = 8000;
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/display"));

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/:subpath", (req, res) => {
  const { subpath } = req.params;
  const { q } = req.query;
  const { todos, users, photos } = data;
  res.render(`${subpath}`, { subpath, todos, users, photos });
});
app.get("*", (req, res) => {
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
