export const validPassword = (password) => {
  return password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
};

export const validNum = (value) => {
  if (!value) return true;
  return value[value.length - 1].match(/\d/);
};
