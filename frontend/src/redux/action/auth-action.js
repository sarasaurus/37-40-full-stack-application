import superagent from 'superagent';
import * as routes from '../../routes';
import { deleteCookie } from '../../utils/cookie';
import TOKEN_COOKIE_KEY from '../../constants';

// SYNC
export const setTokenAction = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const removeTokenAction = () => ({
  type: 'TOKEN_REMOVE',
});


export const logoutFunction = () => {
  deleteCookie(TOKEN_COOKIE_KEY);
  return removeTokenAction();
};


// ASYNC

export const signupRequest = user => (store) => {

  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setTokenAction(response.text));
    });
};
export const loginRequest = user => (store) => {
  console.log('USER LOGIN superagent sent:', user);
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      console.log('RESPONSE LOGIN:', response);
      return store.dispatch(setTokenAction(response.text));
    });
};
