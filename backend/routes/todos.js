const { Todo } = require("../models/todo");
const express = require("express");
const Joi = require('joi')

//Create instance of Router
const router = express.Router();

router.post("/", async (req, res) => {

  //Add Joi validation
  const schema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    author: Joi.string().min(3).max(30),
    uid: Joi.string(),
    isComplete: Joi.boolean(),
    date: Joi.date()
  }).options( { abortEarly: false});

  const { error} = schema.validate(req.body);
 
  //If there is an error stops all the later code from happening and sends
  //Error to client
  if (error) return res.status(400).send(error.details[0].message)


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

module.exports = router
