const todoReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [action.payload, ...state];
    case "GET_TODOS":
      return action.todos.data;
      case "UPDATE_TODO":
        return state.map((todo) => 
          todo._id == action.todo.data._id ? action.todo.data : todo
        )
    default:
      return state;
  }
};

export default todoReducer;
