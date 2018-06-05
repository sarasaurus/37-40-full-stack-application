
export default function autoBind(classComponent) {
  // needs to be a vanilla function, arrow functions don't have contextual this!
  const classMethods = Object.getOwnPropertyNames(classComponent.prototype); // it gets all the object keys that would otherwise not show in object.keys--- keys can be innumerable and non-inumerable, which is to say public properties==numerable, private properties==non-inumerable-- react makes the component methods 'private/non-innumberable' and so we must use this object method, rather thanjust iterating through the keys
  classMethods.forEach((method) => {
    if (method.startsWith('handle')) {
      this[method] = this[method].bind(this); // this is just to handle any weird syntax in a string, 
    }
  });
}

export const validateTree = (payload) => {
  if (!payload._id) {
    throw new Error('VALIDATION ERROR: Tree must exist');
  }
  else if (!payload.name) {
    throw new Error('VALIDATION ERROR: Tree must have a name');
  }
  else if (!payload.city) {
    throw new Error('VALIDATION ERROR: Tree must have a city');
  }
};

// looks like you can export a default, but also export a specific if want--- import can still grab default with just import xyz from 'component'--->
// but can grab something more specific  { importValidateTodo } from 'component';
// importng something that is not a default, must wrap in curlies
// import { validateTodo } from '../../utils/utils';