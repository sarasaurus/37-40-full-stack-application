import { validateTree } from '../../../utils/utils';

const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  // if pass in action instead:
  // const { type, payload } = action;--- to get the properties

  // destructuring the action object with {type, payload }
  // PARK: More to add here
  switch (type) {
    case 'PARK_FETCH':
      return payload;

    case 'PARK_CREATE':
      validateTree(payload);
      return [payload, ...state];// this just adds new item first

    case 'PARK_UPDATE':
      validateTree(payload);
      return state.map(park => (park._id === payload._id ? payload : park));

    case 'PARK_DELETE':
      return state.filter(park => park._id !== payload._id);

    default:
      return state; // need the default because all actions get filtered through, not just 'park' actions, so need a way to exit when none of the cases are triggered
  }
};
