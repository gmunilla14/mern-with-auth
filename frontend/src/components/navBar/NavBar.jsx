import React from "react";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  linkStyle: {
    color: "#fafafa",
    textDecoration: "none",
  },
});

const NavBar = () => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSignOut = () => {
    //Sign out user
    history.push("/signin");
    dispatch(signOut());
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.root}>
            <Link to="/" className={classes.linkStyle}>
              To Do App
            </Link>
          </Typography>
          {auth._id ? (
            <>
              {" "}
              <Typography variant="subtitle2" className={classes.root}>
                Logged in as {auth.name}
              </Typography>
              <Button color="inherit" onClick={() => handleSignOut()}>
                SignOut
              </Button>{" "}
            </>
          ) : (
            <>
              {" "}
              <Button color="inherit">
                <Link className={classes.linkStyle} to="/signin">
                  SignIn
                </Link>
              </Button>
              <Button color="inherit">
                <Link className={classes.linkStyle} to="/signup">
                  SignUp
                </Link>
              </Button>{" "}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
