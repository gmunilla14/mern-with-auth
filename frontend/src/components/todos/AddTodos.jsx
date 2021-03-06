import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo } from "../../store/actions/todoActions";

import { TextField, Button, Toolbar } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formStyle: {
    margin: "0px auto",
    padding: "20px",
    borderRadius: "9px",
    boxShadow: " 0px 0px 12px -3px #000000",
    justifyContent: "space-between",
  },
  submitButton: {
    marginLeft: "20px",
  },
});

const AddTodo = ({ todo, setTodo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo._id) {
      const id = todo._id;
      const updatedTodo = {
        name: todo.name,
        isComplete: todo.isComplete,
        date: todo.date,
        author: auth.name,
        uid: todo.uid
      };
      dispatch(updateTodo(updatedTodo, id));
    } else {
      const newTodo = {
        ...todo,
        date: new Date(),
      };
      dispatch(addTodo(newTodo));
    }

    setTodo({
      name: "",
      isComplete: false,
    });
  };

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        className={classes.formStyle}
        onSubmit={handleSubmit}
      >
        <Toolbar>
          <TextField
            id="enter-todo"
            label="Enter To-Do"
            variant="outlined"
            autofocus
            fullWidth
            value={todo.name}
            onChange={(e) => {
              setTodo({ ...todo, name: e.target.value, author: auth.name });
              console.log(todo);
            }}
          />
          <Button
            className={classes.submitButton}
            color="primary"
            variant="contained"
            type="submit"
          >
            <Send />
          </Button>
        </Toolbar>
      </form>
    </>
  );
};

export default AddTodo;
