import * as colors from '@material-ui/core/colors'
import { Palette } from '@material-ui/core/styles/createPalette'

const white = '#FFFFFF'
const black = '#000000'

export interface AdditionalPaletteOptions {
  icon: string
  border: {
    main: string
    secondary: string
  }
}

const palette: Partial<Palette> = {
  primary: {
    contrastText: white,
    dark: '#b34e40',
    main: '#b34e40',
    light: '#d16b3b',
  },
  secondary: {
    contrastText: '#202020',
    dark: '#b0b0b0',
    main: '#ead4c9',
    light: '#d8d8d8',
  },
  success: {
    contrastText: white,
    dark: '#4caf50',
    main: '#3dc47e',
    light: '#4caf50',
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: '#251c16',
    secondary: '#3f3935',
    tertiary: '#262d33',
    disabled: '#939393',
    contrast: '#fbf6eb',
    light: '#4b5157',
    hint: '#939699',
    description: '#999291',
  },
  icon: colors.grey[400],
  background: {
    default: '#faf7f2',
    primary: '#faf7f2',
    secondary: '#f4ead9',
    tertiary: '#f3efe8',
    paper: white,
    dark: '#251f1b',
  },
  border: {
    main: '#d9dadb',
    secondary: '#f0f0f0',
  },
  divider: '#f4f3f3',
}

export default palette
