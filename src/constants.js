export const SCROLL_OPTIONS = {
  behavior: 'smooth',
  block: 'end',
};

export const TESTS = {
  rapid: {
    name: 'Rapid',
    info: [
      'Administered via a nasal swab',
      'This test will detect if you are actively infected with the COVID-19 virus',
      'Results in as little as 15 minutes',
    ],
  },
  pcr: {
    name: 'PCR',
    info: [
      'Administered via a nasal swab',
      'This test will detect if you are actively infected with the COVID-19 virus',
      'Results in 3-4 days',
    ],
  },
  blood: {
    name: 'Antibody',
    info: [
      'Administered via a blood sample',
      'This test will detect if you have had prior exposure to or infection with COVID-19 and have built antibodies for the virus',
      'Results in 5-7 days',
    ],
  },
};

export const FILTER_INIT = {
  rapid: false,
  pcr: false,
  blood: false,
};

export const DATE_FORMAT = 'MMMM D, YYYY';

export const TIMESLOTS = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
];

export const LIGHT_THEME = `
  --overlay-transparent: rgba(22, 31, 39, 0.7);
  --html-bg: #e8d4d4;
  --bg-primary: #f5f7fa;
  --bg-secondary: #e4e7eb;
  --bg-tertiary: #cbd2d9;
  --text-primary: #161f27;
  --text-secondary: #1f2b36;
  --text-light: #c4c4c4;
  --highlight-red: #f80908;
  --btn-enabled: #cbd2d9;
  --btn-disabled: #e4e7eb;
  --icon-default: #c4c4c4;
  --icon-active: #2f80ed;
  --icon-disabled: #dadada;
  --white: white;
  --blue: blue;
  --gray: gray;
  --green: green;
  --pink: pink;
`;

export const DARK_THEME = `
  --overlay-transparent: rgba(22, 31, 39, 0.7);
  --html-bg: brown;
  --bg-primary: black;
  --bg-secondary: darkblue;
  --bg-tertiary: greyblue;
  --text-primary: white;
  --text-secondary: grey;
  --text-light: smoke;
  --highlight-red: pink;
  --btn-enabled: lightblue;
  --btn-disabled: green;
  --icon-default: gold;
  --icon-active: yellow;
  --icon-disabled: lightyellow;
  --white: black;
  --blue: lightblue;
  --gray: smoke;
  --green: yellow;
  --pink: red;
`;
