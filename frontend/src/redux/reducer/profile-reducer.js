const initialState = null;

const validateProfile = (profile) => {
  if (!profile) {
    throw new Error('No Profile!');
  }
  
  const { firstName, lastName, bio, account, _id } = profile;
  if (!firstName || !lastName || !bio || !account || !_id) {
    throw new Error('Invalid Profile');
  }
  return undefined;
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CLIENT_PROFILE_SET':
      validateProfile(payload);
      return payload;
    case 'UPDATE_PROFILE':
      return payload;

    case 'TOKEN_REMOVE': 
      return null; 
    default:
      return state; 
  }
};
