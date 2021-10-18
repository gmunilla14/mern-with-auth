import React, {useState} from "react";
import AddTodo from "./AddTodos";
import ListTodos from "./ListTodos";

const Todos = () => {
  const [todo, setTodo] = useState({
    name: "",
    isComplete: false,
  });
  return (
    <>
      <h2>Todos</h2>
      <AddTodo todo={todo} setTodo={setTodo}/>
      <ListTodos setTodo={setTodo}/>
    </>
  );
};

export default Todos;
