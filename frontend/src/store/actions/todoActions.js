import axios from "axios";
import { url } from "../../api/index";

export const getTodos = () => {
  return (dispatch) => {
    axios
      .get(`${url}/todos`)
      .then((todos) => {
        dispatch({
          type: "GET_TODOS",
          todos,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const addTodo = (newTodo) => {
  return (dispatch, getState) => {
    axios
      .post(`${url}/todos`, newTodo)
      .then((todo) => {
        dispatch({ type: "ADD_TODO", payload: todo });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const updateTodo = (updatedTodo, id) => {
  return (dispatch) => {
    axios
      .put(`${url}/todos/${id}`, updatedTodo)
      .then((todo) => {
        dispatch({ type: "UPDATE_TODO",  todo });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

