import { COLORS, COLOR_HEXS, themes } from './config';
import { ITheme, IMappedTheme } from './themeTypes';

interface Palette {
  [key: number]: string;
}

interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface TailwindConfig {
  [key: string]: Record<string, Record<string, string>>;
}

const hexToRgb = (hex: string): Rgb | null => {
  const sanitizedHex = hex.replaceAll('##', '#');
  const colorParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(sanitizedHex);

  if (!colorParts) {
    return null;
  }

  const [, r, g, b] = colorParts;

  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16),
  } as Rgb;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => `0${c.toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const lighten = (hex: string, intensity: number): string => {
  const color = hexToRgb(`#${hex}`);

  if (!color) {
    return '';
  }

  const r = Math.round(color.r + (255 - color.r) * intensity);
  const g = Math.round(color.g + (255 - color.g) * intensity);
  const b = Math.round(color.b + (255 - color.b) * intensity);

  return rgbToHex(r, g, b);
};

const darken = (hex: string, intensity: number): string => {
  const color = hexToRgb(hex);

  if (!color) {
    return '';
  }

  const r = Math.round(color.r * intensity);
  const g = Math.round(color.g * intensity);
  const b = Math.round(color.b * intensity);

  return rgbToHex(r, g, b);
};

const convertColor = (baseColor: string): Palette => {
  const response: Palette = {
    500: `#${baseColor}`.replace('##', '#'),
  };

  const intensityMap: {
    [key: number]: number;
  } = {
    50: 0.95,
    100: 0.9,
    200: 0.75,
    300: 0.6,
    400: 0.3,
    600: 0.9,
    700: 0.75,
    800: 0.6,
    900: 0.49,
  };

  [50, 100, 200, 300, 400].forEach((level) => {
    response[level] = lighten(baseColor, intensityMap[level]);
  });

  [600, 700, 800, 900].forEach((level) => {
    response[level] = darken(baseColor, intensityMap[level]);
  });

  return response;
};

export const getTailwindConfig = (theme: ITheme): TailwindConfig =>
  Object.keys(theme).reduce(
    (acc, item) => ({
      ...acc,
      [item]: convertColor(theme[item]),
    }),
    {}
  );

export const mapTheme = (theme: ITheme): IMappedTheme => {
  const result = {};
  const tailwindTheme: TailwindConfig = getTailwindConfig(theme);

  Object.keys(tailwindTheme).forEach((colorName: string) => {
    Object.keys(tailwindTheme[colorName]).forEach((shade: string) => {
      const color = tailwindTheme[colorName][shade] as unknown as string;
      result[`--${colorName}-${shade}`] = color;
      COLOR_HEXS[`${colorName}_${shade}`] = color;
      COLORS[`${colorName}_${shade}`] = `var(--${colorName}-${shade})`;
    });
  });
  return result;
};

export const applyTheme = (theme: ITheme): void => {
  const themeObject: IMappedTheme = mapTheme({ ...themes.default, ...theme });
  if (!themeObject) return;

  const root = document.documentElement;

  Object.keys(themeObject).forEach((property) => {
    if (property === 'name') {
      return;
    }

    root.style.setProperty(property, themeObject[property]);
  });
};

export { convertColor };
