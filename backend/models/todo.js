const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 200 },
  author: {type: String, minlength: 3, maxlength: 30},
  uid: String,
  isComplete: Boolean,
  date: { type: Date, default: new Date() },
});

//Create model of name Todo based off of todoSchema
const Todo = mongoose.model('Todo', todoSchema)

exports.Todo = Todo