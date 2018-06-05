import { combineReducers } from 'redux';
import parks from './park-reducer';
import token from './token-reducer';

// this is like a bundler for our reducers
export default combineReducers({
  parks,
}); // remember this is just destructuring todos: todos.todos; categories: categories.categories or something maybe, expenses: expenses,
