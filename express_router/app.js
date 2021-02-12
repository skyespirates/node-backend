const express = require("express");
const app = express();
const studentRoutes = require("./routes/student");
const animalRoutes = require("./routes/animal");

app.use("/students", studentRoutes);
app.use("/animals", animalRoutes);

app.get("/", (req, res) => {
  res.send("connected");
});

app.listen(3000, () => {
  console.log("listening on port: 3000");
});
