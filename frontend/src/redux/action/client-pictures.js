import superagent from 'superagent';
import * as routes from '../../routes';

// SYNC

const set = pictures => ({
  type: 'CLIENT_PICTURES_SET',
  payload: pictures,
});

const create = picture => ({
  type: 'CLIENT_PICTURE_CREATE', 
  payload: picture,
});

// ASYNC

const createRequest = picture => (store) => {
  const { token } = store.getState();
  const parsedToken = JSON.parse(token);
  console.log('PICTURE ROUTE: token', { token });
  console.log('PICTURE ROUTE: Parsed Token', parsedToken);
  console.log('PICTURE ROUTE: picture', picture);
  return superagent.post(`${API_URL}${routes.PHOTOS_ROUTE}`)
    .set('Authorization', `Bearer ${parsedToken.token}`) // I think i need to see what the backend is getting here
    .field('description', picture.description)
    .attach('photo', picture.picture)
    .then((response) => {
      return store.dispatch(create(response.body));
    });
};

export { createRequest };
