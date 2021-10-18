const todoReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [action.payload, ...state];
    case "GET_TODOS":
      return action.todos.data;
    default:
      return state;
  }
};

export default todoReducer;
