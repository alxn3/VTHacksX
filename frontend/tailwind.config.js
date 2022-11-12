const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const withOpacityValue = (hue, hueShift, saturation, luminiosity) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `hsl(calc(var(${hue}) + ${hueShift}), ${saturation}%, ${luminiosity}%)`;
    }
    return `hsl(calc(var(${hue}) + ${hueShift}), ${saturation}%, ${luminiosity}%, ${opacityValue})`;
  };
};

const COLOR_PALETTE_VALUES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const generateSwatch = (
  hue,
  settings = {
    hueShift: [-10, 10],
    saturation: [50, 90],
    luminiosity: [10, 90],
  }
) => {
  const rangeLum = settings.luminiosity[1] - settings.luminiosity[0];
  const stepLum = rangeLum / COLOR_PALETTE_VALUES.length;
  const rangeHue = settings.hueShift[1] - settings.hueShift[0];
  const stepHue = rangeHue / COLOR_PALETTE_VALUES.length;
  const rangeSat = settings.saturation[1] - settings.saturation[0];
  const stepSat = rangeSat / COLOR_PALETTE_VALUES.length;
  return Object.fromEntries(
    Array.from(COLOR_PALETTE_VALUES, (elem, i) => [
      elem,
      withOpacityValue(
        hue,
        settings.hueShift[1] - i * stepHue,
        settings.saturation[1] - i * stepSat,
        settings.luminiosity[1] - i * stepLum
      ),
    ])
  );
};

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Raleway', ...defaultTheme.fontFamily.sans]
    },
    colors: {
      ...colors,
      black: "#110E15",
      white: "#F9F5F3"
    },
    extend: {
      colors: {
        primary: generateSwatch('--color-primary', {
          hueShift: [20, -20],
          saturation: [40, 90],
          luminiosity: [10, 90],
        }),
        secondary: generateSwatch('--color-secondary', {
          hueShift: [20, -20],
          saturation: [40, 90],
          luminiosity: [10, 90],
        }),
        accent: generateSwatch('--color-accent', {
          hueShift: [-20, 20],
          saturation: [40, 90],
          luminiosity: [10, 90],
        }),
      },
    },
  },
  plugins: [],
};