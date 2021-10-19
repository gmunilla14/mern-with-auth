import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { signUp } from "../../store/actions/authActions";

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

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signUp(user));

    setUser({
      name: "",
      email: "",
      password: "",
    });
  };

  if (auth._id) return <Redirect to="/" />;

  return (
    <>
      <h2>SignUp</h2>
      <form
        className={classes.formStyle}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">Sign Up</Typography>
        <TextField
          className={classes.spacing}
          id="enter-name"
          label="Enter Name"
          variant="outlined"
          fullWidth
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <TextField
          className={classes.spacing}
          id="enter-email"
          label="Enter Email"
          variant="outlined"
          fullWidth
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          className={classes.spacing}
          id="enter-password"
          label="Enter Password"
          type="password"
          variant="outlined"
          fullWidth
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.spacing}
        >
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default SignUp;
