import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";

import Todos from "./components/todos/Todos";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import NavBar from "./components/navBar/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Container maxWidth = "md">
          <NavBar />
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" component={Todos} />
          </Switch>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
