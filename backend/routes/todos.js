const { Todo } = require("../models/todo");
const express = require("express");
const Joi = require("joi");
const auth = require("../middleware/auth");

//Create instance of Router
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find().sort({ date: -1 });
    //console.log(req.user);
    const filteredTodos = todos.filter((todo) => todo.uid === req.user._id);
    res.send(filteredTodos);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.post("/", auth, async (req, res) => {
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

/*
router.delete("/", async (req, res) => {
  //deleteOne() If there are multiple that satisfy the filter, the first
  //one that is found will be deleted
  //const todo = await Todo.deleteOne({isComplete:true})

  //deleteMany()
  try {
    const todo = await Todo.deleteMany({ isComplete: false });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});*/

router.delete("/:id", auth, async (req, res) => {
  try {
    //Check to see if a todo with the given id exists
    const todo = await Todo.findById(req.params.id);

    //Send Error 404 if there is no To do
    if (!todo) return res.status(404).send("Todo Not Found...");

    //Send Error 401 if user isnt creator of the To do
    if (todo.uid !== req.user._id)
      return res.status(401).send("Todo deletion failed. Not authorized...");

    //findByIdAndDelete()
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    res.send(deletedTodo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
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

  try {
    //Check to see if a todo with the given id exists
    const todo = await Todo.findById(req.params.id);

    //Send Error 404 if there is no To do
    if (!todo) return res.status(404).send("Todo Not Found...");

    //Send Error 401 if user isnt creator of the To do
    if (todo.uid !== req.user._id)
      return res.status(401).send("Todo update failed. Not authorized...");

    //Get update parameters from API call
    const { name, author, isComplete, date, uid } = req.body;

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

router.patch("/:id", auth, async (req, res) => {
  try {
    //Check to see if a todo with the given id exists
    const todo = await Todo.findById(req.params.id);
    //Send Error 404 if there is no To do
    if (!todo) return res.status(404).send("Todo Not Found...");

    //Send Error 401 if user isnt creator of the To do
    if (todo.uid !== req.user._id)
      return res
        .status(401)
        .send("Todo check/uncheck failed. Not authorized...");

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        //Set isComplete to the opposite value
        isComplete: !todo.isComplete,
      },
      { new: true }
    );

    res.send(updatedTodo);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

module.exports = router;
