const { Todo } = require("../models/todo");
const express = require("express");
const Joi = require("joi");

//Create instance of Router
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });
    res.send(todos);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.post("/", async (req, res) => {
  //Add Joi validation
  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    author: Joi.string().min(3).max(30),
    uid: Joi.string(),
    isComplete: Joi.boolean(),
    date: Joi.date(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);

  //If there is an error stops all the later code from happening and sends
  //Error to client
  if (error) return res.status(400).send(error.details[0].message);

  const { name, author, isComplete, date, uid } = req.body;

  let todo = new Todo({
    name,
    author,
    isComplete,
    date,
    uid,
  });

  //The following two are the same if you remove async from
  //Before the arrow func
  /*
  todo
    .save()
    .then((todo) => {
      res.send(todo);
    })
    .catch((err) => {
      console.log(err);
    });
*/
  try {
    todo = await todo.save();
    res.send(todo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.delete("/", async (req, res) => {
  //deleteOne() If there are multiple that satisfy the filter, the first
  //one that is found will be deleted
  //const todo = await Todo.deleteOne({isComplete:true})

  //deleteMany()
  const todo = await Todo.deleteMany({ isComplete: false });
});

router.delete("/:id", async (req, res) => {
  try {
    //findByIdAndDelete()
    const todo = await Todo.findByIdAndDelete(req.params.id);

    res.send(todo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.put("/:id", async (req, res) => {
  //Add Joi validation
  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    author: Joi.string().min(3).max(30),
    uid: Joi.string(),
    isComplete: Joi.boolean(),
    date: Joi.date(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);

  //If there is an error stops all the later code from happening and sends
  //Error to client
  if (error) return res.status(400).send(error.details[0].message);

  //Check to see if a todo with the given id exists
  const todo = await Todo.findById(req.params.id);

  //Send Error 404 if there is no To do
  if (!todo) return res.status(404).send("Todo Not Found...");

  //Get update parameters from API call
  const { name, author, isComplete, date, uid } = req.body;

  try {
    //Update the To do
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { name, author, isComplete, date, uid },
      { new: true }
    );

    res.send(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

module.exports = router;
