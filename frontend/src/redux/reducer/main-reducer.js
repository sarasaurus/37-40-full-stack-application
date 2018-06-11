import { combineReducers } from 'redux';
import token from './token-reducer';
import profile from './profile-reducer';

// this is like a bundler for our reducers
export default combineReducers({
  token, profile,
}); // remember this is just destructuring todos: todos.todos; categories: categories.categories or something maybe, expenses: expenses,
