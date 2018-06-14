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
  // remove cookie and token from store-- remove all copies of token-- think did you set to local storage--- can get complex if there are many places you are storing
  deleteCookie(TOKEN_COOKIE_KEY);
  return removeTokenAction();
};


// ASYNC

export const signupRequest = user => (store) => {
  // console.log('WE IN SIGN UP', user);
  // console.log('API_URL IN SIGN UP', API_URL);
  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    .withCredentials()
    .then((response) => {
      // console.log('RESPONSE:', response);
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



// this is where you will interface with oAuth api
// it will basically look the same as our code to login
// tho only way to trigger actions is to use the dispatch funciton--- here it is calling the SYNCRONOUS FUNCTIN to update the store, after the sync request and returned a response

// export const logoutRequest = 
// // think about how to distinguish syncronous from asyncronous actions using naming conventions
