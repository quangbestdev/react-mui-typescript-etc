import React, { useState, useEffect } from 'react'
import validate from 'validate.js'
import clsx from 'clsx'
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Typography } from '@material-ui/core'
import { useAuth } from '../../auth'

interface RegisterFormProps {
  className?: string
  isModal?: boolean
  onRegisterSuccess?: () => void
}

interface RegisterFormValues {
  email?: string
  password?: string
}

interface RegisterFormFieldState {
  email?: boolean
  password?: boolean
}

interface RegisterFormState {
  isValid: boolean
  values: RegisterFormValues
  touched: RegisterFormFieldState
  errors: RegisterFormFieldState
}

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
  },
}

const useStyles = makeStyles((theme: any) => ({
  field: {
    marginBottom: theme.spacing(5),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
    },
    '& input': {
      padding: theme.spacing(1.5, 0),
      fontSize: theme.typography.pxToRem(16),
    },
  },
  textFieldLabel: {
    color: theme.palette.text.light,
    fontSize: theme.typography.pxToRem(16),
  },
  text: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    marginTop: theme.spacing(3),
    fontWeight: 500,
    '& > button': {
      padding: 0,
      margin: theme.spacing(0, 0, 0.5, 0.5),
      marginBottom: theme.spacing(0.5),
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '& > .MuiButton-label': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        textTransform: 'none',
        lineHeight: 1.57,
        letterSpacing: 0,
      },
    },
  },
}))

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { className, onRegisterSuccess, isModal, ...rest } = props
  const classes = useStyles()
  const [formState, setFormState] = useState<RegisterFormState>({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  })

  const { signUp, closeRegisterModal, openLoginModal } = useAuth()

  const handleChange = (event) => {
    event.persist()

    setFormState((prevFormState) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      },
      touched: {
        ...prevFormState.touched,
        [event.target.name]: true,
      },
    }))
  }

  const handleSubmit = async (event) => {
    const { email, password } = formState.values
    event.preventDefault()
    const { error } = await signUp({ username: email, password })
    if (!error) {
      if (onRegisterSuccess) onRegisterSuccess()
      else {
        Router.push('/')
      }
    }
  }

  const handleOnClick = () => {
    if (isModal) {
      closeRegisterModal()
      openLoginModal()
    } else {
      Router.push('/login')
    }
  }

  const hasError = (field: string) => Boolean(formState.touched[field] && formState.errors[field])

  useEffect(() => {
    const errors = validate(formState.values, schema)

    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {},
    }))
  }, [formState.values])

  return (
    <form {...rest} className={clsx(className)} onSubmit={handleSubmit}>
      <div className={classes.field}>
        <TextField
          required
          error={hasError('email')}
          fullWidth
          helperText={hasError('email') ? formState.errors.email[0] : null}
          label="Email"
          name="email"
          onChange={handleChange}
          value={formState.values.email || ''}
          placeholder="Enter your email"
          InputLabelProps={{ required: false, shrink: true, className: classes.textFieldLabel }}
        />
      </div>
      <div className={classes.field}>
        <TextField
          required
          error={hasError('password')}
          fullWidth
          helperText={hasError('password') ? formState.errors.password[0] : null}
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          placeholder="Enter your password"
          InputLabelProps={{ required: false, shrink: true, className: classes.textFieldLabel }}
          inputProps={{ minlength: '8' }}
        />
      </div>
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Sign Up
      </Button>
      <Typography variant="subtitle2" className={classes.text}>
        Already have an account?
        <Button disableRipple onClick={handleOnClick}>
          Log in here
        </Button>
      </Typography>
    </form>
  )
}

export default RegisterForm
