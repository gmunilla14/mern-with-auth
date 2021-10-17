import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formStyle: {
    margin: "0px auto",
    padding: "30px",
    borderRadius: "9px",
    boxShadow: " 0px 0px 12px -3px #000000",
  },
  spacing: {
    marginTop: "20px",
  },
});

const SignIn = () => {
  const classes = useStyles();
  return (
    <>
      <h2>SignIn</h2>
      <form className={classes.formStyle} noValidate autoComplete="off">
        <Typography variant="h5">Sign In</Typography>
        <TextField
          className={classes.spacing}
          id="enter-email"
          label="Enter Email"
          variant="outlined"
          fullWidth
        />
        <TextField
          className={classes.spacing}
          id="enter-password"
          label="Enter Password"
          type="password"
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.spacing}
        >
          Sign In
        </Button>
      </form>
    </>
  );
};

export default SignIn;
