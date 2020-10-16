import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { FormControl, InputLabel, FormHelperText } from '@material-ui/core'

type CardFieldWrapper = React.ComponentProps<typeof FormControl> & {
  label?: React.ReactNode
  helperText?: React.ReactNode
}

const useStyles = makeStyles<Theme, { error?: boolean }>((theme) => ({
  root: {
    '& > .MuiInputLabel-root': {
      position: 'unset',
    },
    '& .StripeElement': {
      '&:hover, &$--focus': {
        borderBottom: ({ error }) =>
          error ? `2px solid ${theme.palette.error.main}` : `2px solid ${theme.palette.primary.main}`,
        paddingBottom: theme.spacing(1.5),
      },
      '&$--invalid': {
        borderBottom: `2px solid ${theme.palette.error.main} !important`,
        paddingBottom: theme.spacing(1.5),
      },
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.625),
      borderBottom: ({ error }) =>
        error ? `2px solid ${theme.palette.error.main}` : `1px solid ${theme.palette.text.disabled}`,
      '& > .InputElement': {
        color: 'red',
        '&::placeholder': {
          color: 'purple',
        },
      },
    },
  },
}))

const CardFieldWrapper: React.FC<CardFieldWrapper> = (props) => {
  const { children, label, helperText, error, ...rest } = props
  const classes = useStyles({ error })

  return (
    <FormControl className={classes.root} error={error} {...rest}>
      {label && <InputLabel shrink>{label}</InputLabel>}
      {children}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default CardFieldWrapper
