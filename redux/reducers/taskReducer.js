import { CREATE_TASK } from '../actionTypes/action';

const initialState = {
  tasks: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    default:
      return state;
  }
};

export default tasksReducer;