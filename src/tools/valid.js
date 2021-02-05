export const validPassword = (password) => {
  return password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
};

export const validNum = (value) => {
  if (!value) return true;
  return value[value.length - 1].match(/\d/);
};

export const checkValidForm = (inputs) => {
  let errors = {};
  let interupt = false;
  for (let [name, val] of Object.entries(inputs)) {
    if (!val) {
      errors[name] = 'required';
      document.querySelector(`input[name=${name}]`).focus();
      interupt = true;
    } else {
      errors[name] = '';
    }
  }
  return [errors, interupt];
};
