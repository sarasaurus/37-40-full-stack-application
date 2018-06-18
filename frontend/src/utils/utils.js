
export default function autoBind(classComponent) {
  const classMethods = Object.getOwnPropertyNames(classComponent.prototype); 
  classMethods.forEach((method) => {
    if (method.startsWith('handle')) {
      this[method] = this[method].bind(this); 
    }
  });
}

export const validateUser = (payload) => {
  if (!payload._id) {
    throw new Error('VALIDATION ERROR: User must exist');
  } else if (!payload.name) {
    throw new Error('VALIDATION ERROR: User must have a name');
  } else if (!payload.token) {
    throw new Error('VALIDATION ERROR: User must have a token');
  }
};
