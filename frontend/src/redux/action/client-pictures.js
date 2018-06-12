import superagent from 'superagent';
import * as routes from '../../routes';

// SYNC

const set = pictures => ({
  type: 'CLIENT_PICTURES_SET',
  payload: pictures,
});

const create = picture => ({
  type: 'CLIENT_PICTURE_CREATE', // NAME_ACTION / ACTION_NAME is a convention, not a requirement
  payload: picture,
});

// ASYNC

const createRequest = picture => (store) => {
  const { token } = store.getState();
  const parsedToken = JSON.parse(token);
  return superagent.post(`${API_URL}${routes.PHOTOS_ROUTE}`)
    .set('Authorization', `Bearer ${parsedToken.token}`)
    .field('description', picture.description)
    .attach('photo', picture.photo)
    .then((response) => {
      return store.dispatch(set(response));
    });
};