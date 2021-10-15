const Joi = require("joi");
const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

//For Signing In
router.post("/", async (req, res) => {
  //Run data validation on the request
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).email().required(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Make sure user exists
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invaid email or password...");

    //Compare input pwd to hashed database pwd
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(400).send("Invaid email or password...");

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
