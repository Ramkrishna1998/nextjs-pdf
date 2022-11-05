import base from './base';
import dark from './dark';
import { IThemeColors } from './themeTypes';

/**
 * The default theme to load
 */

export const DEFAULT_THEME = 'base';
export const DARK_THEME = 'dark';

export const COLORS: Record<string, string> = {};
export const COLOR_HEXS: Record<string, string> = {};

export const COLOR_LIST: IThemeColors[] = [
  'storm-dust',
  'cherry',
  'mine-shaft',
  'neutral',
  'pastel-green',
  'primary',
  'saffron',
  'tangerine',
  'smalt',
];

export const themes = {
  default: base,
  dark,
};
