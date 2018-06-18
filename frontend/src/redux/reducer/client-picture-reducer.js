
export const validatePicture = (picture) => {
  if (!picture) {
    throw new Error('no picture!');
  }
  const {
    _id,
    url,
    description,
    owner,
  } = picture;
  if (!_id || !url || !description || !owner ) {
    throw new Error('invalid picture or picture fields');
  }
  return undefined;
};
export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CLIENT_PICTURES_SET':
      validatePicture(payload);
      return [payload, ...state];
    case 'TOKEN_REMOVE':
      return [];
    default:
      return state;
  }
};

