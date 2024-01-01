import {extendTheme} from 'native-base';

export const NativeBaseTheme = extendTheme({
  fontConfig: {
    Broaven: {
      100: {
        normal: 'Broaven',
        italic: 'Broaven Oblique',
        
      },
    },
    Helvetica: {
      100: {
        normal: 'Helvetica',
        italic: 'Helvetica-Oblique',
      },
      200: {
        normal: 'Helvetica-Bold',
        italic: 'Helvetica-BoldOblique',
      },
    },
  },
  fonts: {
    heading: 'Broaven',
    body: 'Helvetica',
    mono: 'Helvetica',
  },
  colors: {
    primary: {
      '50': '#1c5fcb',
      '100': '#1d50a2',
      '200': '#1b407c',
      '300': '#173058',
      '400': '#0f1f38', // ACTUAL COLOR
      '500': '#0b1524',
      '600': '#070b12',
      '700': '#000001',
    },
    secondary: {
      '200': '#d9eeff',
      '300': '#b1dcff',
      '400': '#8acaff', // ACTUAL COLOR
      '500': '#76bffb',
      '600': '#64b4f5',
      '700': '#54a9ee',
      '800': '#459de6',
      '900': '#3792dc',
    },
    yellow: {
      '50': '#fff7dc',
      '100': '#ffefb5',
      '200': '#ffe68d',
      '300': '#ffde65',
      '400': '#ffd53d', // ACTUAL COLOR
      '500': '#f8cc2c',
      '600': '#f1c31d',
      '700': '#dfb416',
      '800': '#c39f1b',
      '900': '#a98b1e',
    },
    background: {
      '50': '#3170cf',
      '100': '#3060a9',
      '200': '#2c4f84',
      '300': '#263e62',
      '400': '#1b2c46', // ACTUAL COLOR
      '500': '#172233',
      '600': '#111721',
      '700': '#0a0c11',
      '800': '#010102',
    },
  },
  // customize components
  components: {
    Input: {
      defaultProps: {
        _input: {
          selectionColor: undefined,
          cursorColor: undefined,
        },
      },
    },
    TextArea: {
      defaultProps: {
        _input: {
          selectionColor: undefined,
          cursorColor: undefined,
        },
      },
    },
  },
});
