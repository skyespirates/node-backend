const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/school", {
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

//CREATE STUDENT SCHEMA
const studentSchema = new mongoose.Schema({
  name: String,
  sex: String,
  age: Number,
  status: Boolean,
});
//CREATE STUDENT MODEL
const Student = mongoose.model("Student", studentSchema);
//CREATE STUDENT INSTANCE
const skyes = new Student({
  name: "skyes crawford",
  sex: "male",
  age: 18,
  status: true,
});
//INSERTING ONE DOCUMENT
// skyes.save();

//INSERTING MANY DOCUMENT
Student.insertMany([
  {
    name: "uzumaki naruto",
    sex: "male",
    age: 22,
    status: false,
  },
  {
    name: "uchiha sasuke",
    sex: "male",
    age: 23,
    status: false,
  },
  {
    name: "mikasa ackerman",
    sex: "female",
    age: 21,
    status: true,
  },
]).then((data) => {
  console.log("MANY DATA HAS INSERTED");
  console.log(data);
});

//FINDING DOCUMENT

//FIND EVERYTHING IN COLLECTION
Student.find({}).then((data) => console.log(data));
//FIND SPECIFIC DOCUMENT
Student.find({ name: "mikasa ackerman" }).then((data) => console.log(data));
//FIND WITH CONSTRAINT
Student.find({ age: { $gt: 20 } }).then((data) => console.log(data));
//FIND DOCUMENT BY ID
Student.findById("6009a329a13f61191ca95ece").then((data) => console.log(data));

//UPDATING DOCUMENT

//UPDATE ONE DOCUMENT
Student.updateOne(
  { name: "skyes crawford" },
  { name: "hashirama senju" }
).then((data) => console.log(data));
//UPDATE MANY DOCUMENTS
Student.updateMany(
  { name: { $in: ["uzumaki naruto", "uchiha sasuke"] } },
  { age: 25 }
).then((res) => console.log(res));
//FIND ONE AND UPDATA
Student.findOneAndUpdate(
  { name: "uchiha itachi" },
  { name: "uchiha madara" },
  { new: true }
).then((res) => console.log(res));

//DELETING DOCUMENT

//DELETING ONE DOCUMENT
Student.remove({ name: "kagami taiga" }).then((msg) => console.log(msg));
//DELETING MANY DOCUMENTS
Student.deleteMany({ age: { $lte: 20 } }).then((msg) => console.log(msg));
//DELETING ONE DOCUMENT AND GET RETURNING DATA
Student.findOneAndDelete({ name: "uzumaki naruto" }).then((msg) =>
  console.log(msg)
);
