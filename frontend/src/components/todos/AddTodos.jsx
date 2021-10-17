import React from "react";
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

  return (
    <>
      <form noValidate autoComplete="off" className={classes.formStyle}>
          <Toolbar>
        <TextField
          id="enter-todo"
          label="Enter To-Do"
          variant="outlined"
          autofocus
          fullWidth
        />
        <Button
          className={classes.submitButton}
          color="primary"
          variant="contained"
          type="submit"
        >
          <Send />
        </Button></Toolbar>
      </form>
    </>
  );
};

export default AddTodo;
