import { combineReducers } from 'redux';
import token from './token-reducer';

// this is like a bundler for our reducers
export default combineReducers({
  token,
}); // remember this is just destructuring todos: todos.todos; categories: categories.categories or something maybe, expenses: expenses,
