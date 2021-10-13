const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const cors = require('cors')
const todos = require('./routes/todos')

dotenv.config();

//Add Middleware
app.use(cors())
app.use(express.json())

//Add Post Endpoint
app.use('/api/todos', todos)

//Create API endpoint
app.get("/", (req, res) => {
  res.send("Welcome to our todos api!!!");
});

const connection_string = process.env.CONNECT_STRING
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});

mongoose
  .connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection established...");
  })
  .catch((err) => {
    console.log(err);
  });
