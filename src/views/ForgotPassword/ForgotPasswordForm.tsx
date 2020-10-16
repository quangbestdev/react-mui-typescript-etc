import React from 'react'
import { useForm, Controller, ErrorMessage } from 'react-hook-form'
import { Alert } from '@material-ui/lab'
import { Box, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from '../../auth'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > :not(:first-child)': {
      marginTop: theme.spacing(2.5),
    },
  },
  alert: {
    background: theme.palette.background.alert,
    color: theme.palette.secondary.contrastText,
    '& > .MuiAlert-icon': {
      color: theme.palette.secondary.contrastText,
    },
  },
}))

const ForgotPasswordForm = ({ onSubmit }) => {
  const classes = useStyles()

  const { forgotPassword } = useAuth()

  const form = useForm()
  const { handleSubmit, control, errors, setError, clearError } = form

  const beforeSubmit = (onSubmit) => async (values) => {
    const nextValues = {
      username: values.email,
    }

    const { error: forgotPasswordError } = await forgotPassword(nextValues)
    // Set Errors
    const error = []
    if (forgotPasswordError) {
      error.push({ name: 'email', type: 'forgotPassword', message: forgotPasswordError.message })
    }
    if (error.length) return setError(error)

    return onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit(beforeSubmit(onSubmit))} className={classes.root}>
      <Controller
        as={TextField}
        control={control}
        name="email"
        label="Email"
        type="email"
        fullWidth
        required
        onClick={() => clearError('email')}
      />
      <ErrorMessage errors={errors} name="email">
        {({ message }) => (
          <Alert severity="error" className={classes.alert}>
            {message}
          </Alert>
        )}
      </ErrorMessage>
      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" type="submit">
          Request Code
        </Button>
      </Box>
    </form>
  )
}

export default ForgotPasswordForm
