const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  todo: String,
  isCompleted: Boolean,
});

module.exports = mongoose.model("Todo", todoSchema);
