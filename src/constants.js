export const TESTS = {
  rapid: { name: 'Rapid', info: 'rapid test info' },
  pcr: { name: 'PCR', info: 'pcr test info' },
  blood: { name: 'Blood', info: 'blood test info' },
};

export const FILTER_INIT = () => {
  let filterInit = {};
  Object.entries(TESTS).forEach((type) => {
    filterInit[type[0]] = false;
  });
  return filterInit;
};
