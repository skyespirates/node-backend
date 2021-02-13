const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  const { name = "anonymous", color } = req.cookies;
  res.send(`welcome home ${name}`);
});
app.get("/setname", (req, res) => {
  // res.cookie("name", "skyes crawford");
  res.send("cookies was sended");
});

app.listen(3000, () => {
  console.log("listening on port: 3000");
});
