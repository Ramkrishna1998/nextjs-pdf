export interface ITheme {
  [key: string]: string;
}

export interface IThemes {
  [key: string]: ITheme;
}

export interface IMappedTheme {
  [key: string]: string | null;
}

export type IThemeColors =
  | 'primary'
  | 'neutral'
  | 'storm-dust'
  | 'mine-shaft'
  | 'cherry'
  | 'pastel-green'
  | 'saffron'
  | 'tangerine'
  | 'smalt';
