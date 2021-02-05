export const validPassword = (password) => {
  return password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
};

export const validNum = (value) => {
  if (!value) return true;
  return value[value.length - 1].match(/\d/);
};

export const checkRequired = (inputs) => {
  let errors = {};
  let interupt = false;
  for (let [key, val] of Object.entries(inputs)) {
    if (!val) {
      errors[key] = 'required';
      interupt = true;
    } else {
      errors[key] = '';
    }
  }
  return [errors, interupt];
};
