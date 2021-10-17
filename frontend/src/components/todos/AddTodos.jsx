import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/actions/todoActions";

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

const AddTodo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({
    name: "",
    isComplete: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTodo(todo));

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
            onChange={(e) =>
              setTodo({ ...todo, name: e.target.value, date: new Date() })
            }
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
