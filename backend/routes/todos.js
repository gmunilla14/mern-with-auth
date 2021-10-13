const { Todo } = require("../models/todo");
const express = require("express");

//Create instance of Router
const router = express.Router();

router.post("/", async (req, res) => {
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
