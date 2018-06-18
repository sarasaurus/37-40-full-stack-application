import superagent from 'superagent';
import * as routes from '../../routes';

// sync

const setProfile = profile => ({
  type: 'CLIENT_PROFILE_SET',
  payload: profile,
});

const updateProfile = profile => ({
  type: 'UPDATE_PROFILE',
  payload: profile,
});

// async

const createRequest = profile => (store) => {
  const { token } = store.getState(); 
  const parsedToken = JSON.parse(token);
  console.log('TOKEN IN CREATE', parsedToken.token);
  return superagent.post(`${API_URL}${routes.PROFILE_ROUTE}`)
    .set('Authorization', `Bearer ${parsedToken.token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      console.log('__POST PROFILE RESPONSE___', response);
      return store.dispatch(setProfile(response.body)); 
    })
    .catch(err => console.log('POST ERROR', err));
};
const updateRequest = profile => (store) => {
  const { token } = store.getState();
  const parsedToken = JSON.parse(token);
  console.log('PROFILE IN UPDATE', profile);
  return superagent.put(`${API_URL}${routes.PROFILE_ROUTE}/${profile._id}`)
    .set('Authorization', `Bearer ${parsedToken.token}`) 
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(updateProfile(response.body)); // 
    })
    .catch(err => console.log('PUT ERROR', err));
};
const fetchRequest = () => (store) => {
  const { token } = store.getState(); 
  const parsedToken = JSON.parse(token);
  return superagent.get(`${API_URL}${routes.PROFILE_ROUTE}/me`)
    .set('Authorization', `Bearer ${parsedToken.token}`) 
    .then((response) => {
      const profile = JSON.parse(response.text);
      return store.dispatch(setProfile(profile)); // 
    })
    .catch(err => console.log('GET ERROR', err));
};

export { setProfile, createRequest, updateRequest, fetchRequest };
