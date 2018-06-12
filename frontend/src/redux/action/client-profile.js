import superagent from 'superagent';
import * as routes from '../../routes';

// sync

const setProfile = profile => ({
  type: 'CLIENT_PROFILE_SET',
  payload: profile,
});

// async

const createRequest = profile => (store) => {
  const { token } = store.getState(); // can only do because know we have token saved!
  const parsedToken = JSON.parse(token);
  console.log('TOKEN IN CREATE', parsedToken.token);
  return superagent.post(`${API_URL}${routes.PROFILE_ROUTE}`)
    .set('Authorization', `Bearer ${parsedToken.token}`) // this is an http header we use it in our backend to verify the token
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      console.log('__POST PROFILE RESPONSE___', response);
      return store.dispatch(setProfile(response.body)); // if we no do this app will hang or do nothing!
      // response.whatever you api will return!
    })
    .catch(err => console.log('POST ERROR', err));
};
const updateRequest = profile => (store) => {
  const { token } = store.getState();
  const parsedToken = JSON.parse(token);
  console.log('PROFILE IN UPDATE', profile);
  return superagent.put(`${API_URL}${routes.PROFILE_ROUTE}/${profile._id}`)
    .set('Authorization', `Bearer ${parsedToken.token}`) // this is an http header we use it in our backend to verify the token
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      console.log('__PUT PROFILE RESPONSE___', response);
      return store.dispatch(setProfile(response)); // 
    });
};
const fetchRequest = profile => (store) => {
  const { token } = store.getState(); 
  const parsedToken = JSON.parse(token);
  return superagent.get(`${API_URL}${routes.PROFILE_ROUTE}/me`)
    .set('Authorization', `Bearer ${parsedToken.token}`) 
    .then((response) => {
      console.log('__GET PROFILE RESPONSE___', response);
      return store.dispatch(setProfile(response)); // 
    });
};

export { setProfile, createRequest, updateRequest, fetchRequest };
