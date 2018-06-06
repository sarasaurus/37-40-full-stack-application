import { fetchCookie } from '../../utils/cookie';

const initialState = null;

// TODO: need to create the cookie! -- in back end
// document.cookie = 'ppkcookie1=testcookie; expires=Thu, 2 Aug 2001 20:47:11 UTC; path=/'
const token = fetchCookie('name of the cookie you want');

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
