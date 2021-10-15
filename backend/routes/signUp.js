const Joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//For creating a new user
router.post("/", async (req, res) => {
  //Run data validation on the request
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).email().required(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check to see if user already exists
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("User with that email already exists...");

    //Get new user parameters from call
    const { name, email, password } = req.body;

    //Create new user object from Mongoose Schema
    user = new User({
      name,
      email,
      password,
    });

    //Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    //Save user to database
    await user.save();

    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email },
      secretKey
    );

    res.send(token);

  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
});

module.exports = router;
