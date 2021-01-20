const express = require("express");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
const PORT = 3000;

let comments = [
  {
    id: uuid(),
    name: "uchiha madara",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, sunt!",
  },
  { id: uuid(), name: "uchiha shisui", comment: "Lorem ipsum dolor sit amet" },
  {
    id: uuid(),
    name: "uchiha itachi",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, sunt! Lorem ipsum dolor sit amet.",
  },
  { id: uuid(), name: "uchiha sasuke", comment: "Lorem ipsum " },
];
//  tampilkan semua komentar
app.get("/comments", (req, res) => {
  res.render("home", { comments });
});
//  form untuk membuat komentar baru
app.get("/comments/new", (req, res) => {
  res.render("new");
});
//  post request
app.post("/comments", (req, res) => {
  const { name, comment } = req.body;
  comments.push({ name, comment, id: uuid() });
  res.redirect("/comments");
});
//  tampilkan detail post
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("show", { comment });
});
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const updateComment = comments.find((c) => c.id === id);
  res.render("update", { updateComment });
});
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const foundComment = comments.find((c) => c.id == id);
  foundComment.comment = newComment;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
