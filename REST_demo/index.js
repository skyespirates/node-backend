// PACKAGE or LIBRARY
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
// ROUTES
const userRoutes = require("./routes/users");
const todoRoutes = require("./routes/todos");

app.set("views", path.join(__dirname, "/views"));

app.set("view engine", "ejs");

mongoose
  .connect(process.env.DB_URL || "mongodb://localhost:27017/api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("CONNECTED TO MONGOO DB");
  })
  .catch((err) => {
    console.log("OH NO SOMETHING WENT WRONG");
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 8000;
}
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
