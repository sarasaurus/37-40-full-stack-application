// a reducer takes the previous state and updates it to a new state, using an action, think state.reduce(action => action)
// const initialState = profile || null;
// oftern thrown erros are just codes, that mean somehting to the development team, but not to the outsde eg D23_B01, D23_F01 or whatever
// const initialState = null;

const validateProfile = (profile) => {
  if (!profile) {
    throw new Error('No Profile!');
    // this is a developer message if want to show to a user, you'd needa try catch block that interacted with UI
  }
  
  const { bio, account, _id } = profile;
  // if (!username || !email || !bio || !owner) {
  //   console.log(profile, 'WHATS THIS');
  //   throw new Error('Invalid Profile');
  // }
  if (!bio || !account || !_id) {
    console.log(profile, 'WHATS THIS');
    throw new Error('Invalid Profile');
  }
  return undefined;
};

export default (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CLIENT_PROFILE_SET':
      validateProfile(payload);
      return payload;

    case 'TOKEN_REMOVE': // this is like logging out, we are revoking access, so we want to know in any component that is dependant on the token
      return null; // this is like removing the profile from the store, no state is returned, therefore no state is saved
    default:
      return state; // returning state as is with no changes
  }
};
