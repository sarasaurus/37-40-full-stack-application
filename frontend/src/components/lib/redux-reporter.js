export default store => next => (action) => {
  try {
    console.log('__ACTION__', action);
    const result = next(action); // this line updates the store, what does that mean?
    console.log('__STATE__', store.getState());
    // do a set state
    return result;
  } catch (error) {
    console.log('__ERROR__', error);
    action.error = error;
    return action;
  }
};
