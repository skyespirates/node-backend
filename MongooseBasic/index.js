const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/movieApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO MONGOO DB");
  })
  .catch((err) => {
    console.log("OH NO SOMETHING WENT WRONG");
    console.log(err);
  });

//  CREATE MOVIE SCHEMA
const movieSchema = new mongoose.Schema({
  name: String,
  year: Number,
  score: Number,
});
//  CREATE MOVIE MODEL
const Movie = mongoose.model("Movie", movieSchema);
//  CREATE MOVIE INSTANCE
// const dragon = new Movie({name: 'dragon', year: 2012, score: 7.5})
//  SAVE MOVIE INSTANCE TO DATABASE
//  dragon.save()

//  CREATE STUDENT SCHEMA
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isActive: Boolean,
});
//  CREATE STUDENT MODEL
const Student = new mongoose.model("Student", studentSchema);
//  CREATE STUDENT INSTANCE
// const skyes = new Student({ name: "skyes crawford", age: 21, isActive: true });
//  SAVE STUDENT INSTANCE TO DATABASE
// skyes.save()

//  CREATE TODO SCHEMA
const todoSchema = new mongoose.Schema({ todo: String, isComplete: Boolean });
//  CREATE TODO MODEL
const Todo = new mongoose.model("Todo", todoSchema);
//  CREATE TODO INSTANCE
// const running = new Todo({ todo: "running", isComplete: false });
//  SAVE TODO INSTANCE TO DATABASE
// running.save();
