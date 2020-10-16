import { TypographyOptions } from '@material-ui/core/styles/createTypography'
import palette from './palette'

const headerFontFamily = 'Roboto Slab'
const typography: TypographyOptions = {
  fontFamily: 'Lato',
  h1: {
    fontFamily: headerFontFamily,
    fontSize: 58,
    color: palette.primary.contrastText,
    fontWeight: 800,
  },
  h2: {
    fontFamily: headerFontFamily,
    fontSize: 55,
    color: palette.text.contrast,
    fontWeight: 800,
  },
  // Use H3 for headers with font size 40-42 in the mocks
  h3: {
    fontFamily: headerFontFamily,
    fontSize: 42,
    color: palette.text.primary,
    fontWeight: 700,
  },
  h4: {
    fontFamily: headerFontFamily,
    fontSize: 36,
    color: palette.text.primary,
    fontWeight: 600,
  },
  h5: {
    fontFamily: headerFontFamily,
    fontSize: 25,
    color: palette.text.primary,
    fontWeight: 700,
  },
  h6: {
    fontFamily: headerFontFamily,
    fontSize: 22,
    color: palette.text.tertiary,
    fontWeight: 700,
  },
  body1: {
    fontSize: 20,
    color: palette.text.secondary,
    fontWeight: 400,
  },
  body2: {
    fontSize: 18,
    color: palette.primary.contrastText,
    fontWeight: 400,
  },
  subtitle1: {
    fontSize: 16,
    color: palette.text.hint,
    fontWeight: 400,
  },
  button: {
    fontSize: 14,
    fontWeight: 800,
    color: palette.text.contrast,
    textTransform: 'none',
  },
  overline: {
    fontSize: 14,
    fontWeight: 800,
    color: palette.text.tertiary,
    textTransform: 'none',
  },
  caption: {
    fontFamily: headerFontFamily,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: palette.secondary.main,
  },
}

export default typography
