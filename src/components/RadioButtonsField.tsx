import React, { useCallback, useEffect, useState } from 'react'
import isEqual from 'lodash/isEqual'
import kebabCase from 'lodash/kebabCase'
import clsx from 'clsx'
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Button, FormControl, FormControlProps, FormHelperText, FormLabel } from '@material-ui/core'

interface RadioButtonOption {
  value: any
  label: React.ReactNode
  key?: string // for options with complex values that cannot be stringified
  disabled?: boolean // for disabling unavailable options
}

interface RadioButtonsFieldProps extends React.ComponentProps<typeof Button> {
  error?: FormControlProps['error']
  label?: FormControlLabelProps['label']
  helperText?: React.ComponentProps<typeof FormHelperText>['children']
  wrapper?: FormControlProps
  disabled?: boolean
  options?: RadioButtonOption[]
  onChange?: (value: any) => void
  value?: any
}

interface RadioButtonsFieldStyles {
  error?: boolean
}

const useStyles = makeStyles<Theme, RadioButtonsFieldStyles>((theme) => ({
  root: {
    display: 'inline',
  },
  buttonsWrapper: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    },
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
  },
  buttonWrapper: {
    maxWidth: 125,
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, 1, 1),
    },
  },
  radioBtn: {
    padding: theme.spacing(1, 2),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  checked: {
    border: `2px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}))

const RadioButtonsField: React.FC<RadioButtonsFieldProps> = (props) => {
  const {
    value: controlledValue,
    wrapper,
    helperText,
    onChange,
    disabled,
    error,
    label,
    options,
    className,
    ...rest
  } = props
  const classes = useStyles({ error })
  const [value, setValue] = useState(controlledValue)
  const handleClick = (option: RadioButtonOption) => {
    const nextValue = option.value
    setValue(nextValue)
    if (onChange) {
      onChange(nextValue)
    }
  }
  const isOptionChecked = useCallback((option) => isEqual(value, option.value), [value])
  useEffect(() => {
    if (value !== controlledValue) {
      setValue(controlledValue)
    }
  }, [controlledValue])
  return (
    <FormControl
      {...wrapper}
      fullWidth
      disabled={disabled}
      error={error}
      className={clsx(classes.root, wrapper && wrapper.className)}
    >
      {label && <FormLabel>{label}</FormLabel>}
      <Box className={classes.buttonsWrapper}>
        {options.map((option) => (
          <Box className={classes.buttonWrapper}>
            <Button
              key={option.key || kebabCase(option.value)}
              className={clsx(classes.radioBtn, className, isOptionChecked(option) && classes.checked)}
              disabled={disabled || option.disabled}
              variant="outlined"
              onClick={() => handleClick(option)}
              {...rest}
            >
              {option.label}
            </Button>
          </Box>
        ))}
      </Box>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default RadioButtonsField
