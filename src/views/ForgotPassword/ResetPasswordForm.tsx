import React from 'react'
import { useForm, Controller, ErrorMessage } from 'react-hook-form'
import { Alert } from '@material-ui/lab'
import { TextField, Box, Typography, Button } from '@material-ui/core'
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

const ResetPasswordForm = ({ onSubmit, email }) => {
  const classes = useStyles()
  const { forgotPasswordSubmit } = useAuth()

  const form = useForm()
  const { handleSubmit, control, setError, clearError, errors } = form

  const beforeSubmit = (onSubmit) => async (values) => {
    const { code, password, confirmPassword } = values

    const nextValues = {
      username: email,
      code,
      password,
    }

    // Set Errors
    const error = []
    if (confirmPassword !== password) {
      error.push({ name: 'confirmPassword', type: 'notMatch', message: "Password doesn't match" })
    } else {
      const { error: forgotPasswordError } = await forgotPasswordSubmit(nextValues)
      if (forgotPasswordError) {
        error.push({ name: 'code', type: 'forgotPasswordSubmit', message: forgotPasswordError.message })
      }
    }

    if (error.length) return setError(error)
    return onSubmit(values)
  }

  return (
    <form name="forgotPassword" onSubmit={handleSubmit(beforeSubmit(onSubmit))} className={classes.root}>
      <Controller
        as={TextField}
        control={control}
        name="code"
        label="Confirmation Code"
        fullWidth
        required
        onClick={() => clearError('code')}
        helperText={
          <Typography variant="caption" color="primary">
            Check your email for confirmation code
          </Typography>
        }
      />
      <Controller
        as={TextField}
        control={control}
        name="password"
        label="New Password"
        type="password"
        fullWidth
        required
      />
      <Controller
        as={TextField}
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        fullWidth
        required
        onClick={() => clearError('confirmPassword')}
      />
      <ErrorMessage errors={errors} name="confirmPassword">
        {({ message }) => (
          <Alert severity="error" className={classes.alert}>
            {message}
          </Alert>
        )}
      </ErrorMessage>
      <ErrorMessage errors={errors} name="code">
        {({ message }) => (
          <Alert severity="error" className={classes.alert}>
            {message}
          </Alert>
        )}
      </ErrorMessage>
      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" type="submit">
          Reset Password
        </Button>
      </Box>
    </form>
  )
}

export default ResetPasswordForm
