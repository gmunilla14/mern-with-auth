import React from "react";
import AddTodo from "./AddTodos";
import ListTodos from "./ListTodos";

const Todos = () => {
  return (
    <>
      <h2>Todos</h2>
      <AddTodo />
      <ListTodos />
    </>
  );
};

export default Todos;
