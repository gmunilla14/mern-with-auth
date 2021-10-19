import React, {useState} from "react";
import AddTodo from "./AddTodos";
import ListTodos from "./ListTodos";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Todos = () => {
  const [todo, setTodo] = useState({
    name: "",
    isComplete: false,
  });

  const auth = useSelector(state => state.auth)

  if(!auth._id) return <Redirect to="/signin"/>
  return (
    <>
      <h2>Todos</h2>
      <AddTodo todo={todo} setTodo={setTodo}/>
      <ListTodos setTodo={setTodo}/>
    </>
  );
};

export default Todos;
