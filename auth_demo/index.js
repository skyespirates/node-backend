const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const session = require("express-session");
const flash = require("connect-flash");

mongoose
  .connect("mongodb://localhost:27017/authDemo", {
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

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "notagoodsecret" }));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next();
});

// middleware untuk memeriksa user yang login
// cukup periksa apakah ada nilai user_id yang di assign ke req.session
const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

// melindungi route tertentu dengan menggunakan middleware
app.get("/rahasia", requireLogin, (req, res) => {
  res.send("rahasia");
});

// homepage
app.get("/", (req, res) => {
  res.render("home", { online: req.session.user_id });
});

// render form untuk registrasi
app.get("/register", (req, res) => {
  res.render("register");
});

// back-end registrasi
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  req.session.user_id = user._id;
  req.flash("success", "successfully signed you out");
  res.redirect("/secret");
});

// render form untuk login
app.get("/login", (req, res) => {
  res.render("login");
});

// back-en login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findAndValidate(username, password);
  if (foundUser) {
    const result = await bcrypt.compare(password, foundUser.password);
    if (result) {
      req.session.user_id = foundUser._id;
      req.flash("success", "successfully logged you in");
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});

app.get("/secret", (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  res.send("Our Top Secret");
});

app.post("/logout", (req, res) => {
  req.session.user_id = null;
  req.flash("success", "successfully logged you out");
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Serving on port: 3000");
});
