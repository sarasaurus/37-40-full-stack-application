
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
      return [payload, ...state]; // could do ...state, payload
    case 'TOKEN_REMOVE':
      return []; // removing pcitures from state
    default:
      return state;
  }
};

// reducer is function that takes a state and action and returns a new state
