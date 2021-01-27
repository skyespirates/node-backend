const express = require("express");
const app = express();
const morgan = require("morgan");
const AppError = require("./AppError");

app.use(morgan("tiny"));

app.use((req, res, next) => {
  console.log(req.query);
  next();
});
app.use("/users", (req, res, next) => {
  console.log("users path");
  next();
});
const verifyName = (req, res, next) => {
  const { name } = req.query;
  console.log(name === "skyes");
  if (name === "skyes") {
    return next();
  }
  // res.send("you're unauthorized");
  throw new AppError("you are unauthorized", 401);
};
app.get("/", verifyName, (req, res) => {
  res.send("welcome to root path");
});
app.get("/error", (req, res) => {
  chicken.fly();
});
app.get("/users", verifyName, (req, res) => {
  res.send("users path");
});
app.get("/posts", (req, res) => {
  res.send("posts path");
});

app.use((err, req, res, next) => {
  const { status = 500, message = "something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
