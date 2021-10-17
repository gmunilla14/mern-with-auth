const todoReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [action.payload, ...state];
    default:
      return state;
  }
};

export default todoReducer;
