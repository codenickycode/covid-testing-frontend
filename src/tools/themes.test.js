import { LIGHT_THEME, DARK_THEME } from './themes';

describe('themes.js', () => {
  it('contains the correct theme', () => {
    expect(LIGHT_THEME).toContain('--black: #000');
    expect(DARK_THEME).toContain('--black: #fff');
  });
});
