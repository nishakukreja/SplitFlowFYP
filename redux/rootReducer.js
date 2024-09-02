import { combineReducers } from 'redux';
import taskReducer from './reducers/taskReducer';
// other reducers

const rootReducer = combineReducers({
  tasks: taskReducer,
  // other reducers
});

export default rootReducer;
