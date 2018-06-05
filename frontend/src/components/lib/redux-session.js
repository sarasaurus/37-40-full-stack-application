// will save the store to local storage
// this will console log everything thats goign on
// exporting a function
// similar but diff to: default (store, next, action)
export default store => next => (action) => {
  // these lines are before store update
  const result = next(action); // calling next with action 
  // calling one next, starts the currying chain

  // now after update
  const state = store.getState(); // / ow we save to local storage
  for (const key in state) { //eslint-disable-line 
    // this line is looping through the keys in the state object... think of like hash map

    // .call is from the hasOwnProperty method
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      localStorage[key] = JSON.stringify(state[key]);
      // don't want allll the associated properties, just the ones that exist because of the state obj itself, not whatever it inheirts
    }
  }
  return result;
};
