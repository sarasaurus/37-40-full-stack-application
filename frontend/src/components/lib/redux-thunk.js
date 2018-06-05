export default store => next => (action) => { // can also do parentheses
  typeof action === 'function'
    ? action(store)// we likely will not use this second state argument can take it out -- here vinicio has changed to just sthe store, now whoever calls this must do handling on their side-- look at judy's call to see-- its considered bad practice to send an argument a funciton wont use-- so we always need store, maybe not state etc
    : next(action);
};
// the signature is required of all redux middleware

// our ternary says if the type is function-- make the async call when the async action is complete it calls the sync action and updates the store, and finally returns, next which sends us here, at which point we hace DATA not a function and we call next, with our now synchronous action
// otherwise call next

// our todo-actions are all functions!
// ie action = todoCreateRequest(todo) ie its a function
// then gets invoked with
// todoCreateRequest(todo)(store.dispatch)


// this funciton will actually pass through twice -- first with the function and the superagent call, and then back through again, taking in the dispatch object, and then returning the dispatch  action object, ie dispatch(todoCreate(response.body))-- ie vanilla action object!
