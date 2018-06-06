import { fetchCookie } from '../../utils/cookie';
import TOKEN_COOKIE_KEY from '../../constants';

const token = fetchCookie(TOKEN_COOKIE_KEY); // could also import from global variables
// this basically helps your editor help you-- if you misstype a variable you get a linter errpr

const initialState = token || null;

export default (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case 'TOKEN_SET':
      return payload;

    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
