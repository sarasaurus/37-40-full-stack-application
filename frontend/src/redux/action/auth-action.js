import superagent from 'superagent';
import * as routes from '../../utils/routes';

// SYNC
export const setTokenAction = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const removeTokenAction = () => ({
  type: 'TOKEN_REMOVE',
});


// ASYNC

export const signupRequest = user => (store) => {
  // console.log('WE IN SIGN UP', user);
  // console.log('API_URL IN SIGN UP', API_URL);
  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    .then((response) => {
      // console.log('RESPONSE:', response);
      return store.dispatch(setTokenAction(response.text));
    });
};
export const loginRequest = user => (store) => {
  console.log('USER LOGIN superagent sent:', user);
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    .then((response) => {
      console.log('RESPONSE LOGIN:', response);
      return store.dispatch(setTokenAction(response.text));
    });
};
// think about how to distinguish syncronous from asyncronous actions using naming conventions
