import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, Grid, Snackbar } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { TextField } from '@onextech/gvs-kit/core'
import * as yup from 'yup'
import { Alert } from '@material-ui/lab'
import Button from '../../../components/Button'

interface ChangePasswordFormValues {
  [key: string]: string | number
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4.75, 5, 5),
    marginBottom: theme.spacing(12.5),
  },
  form: {
    maxWidth: 630,
    marginTop: theme.spacing(1.75),
  },
  button: {
    marginTop: theme.spacing(3.75),
    padding: theme.spacing(1, 6),
  },
  updateSuccess: {
    '&.MuiAlert-standardSuccess': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    '&.MuiAlert-standardSuccess .MuiAlert-icon': {
      color: theme.palette.primary.contrastText,
    },
  },
  fieldsWrapper: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(0.5),
    },
  },
}))

const MIN_PASSWORD_LENGTH = 6

const changePasswordFormSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(MIN_PASSWORD_LENGTH, `Requires at least ${MIN_PASSWORD_LENGTH} characters.`)
    .required('Required.'),
  newPassword: yup
    .string()
    .min(MIN_PASSWORD_LENGTH, `Requires at least ${MIN_PASSWORD_LENGTH} characters.`)
    .required('Required.'),
})

const ChangePasswordForm = (props) => {
  const classes = useStyles()

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const handleSnackbarClose = () => setOpenSnackbar(false)

  const form = useForm<ChangePasswordFormValues>({ validationSchema: changePasswordFormSchema })
  const { control, handleSubmit, errors, setError, reset } = form

  const onSubmit = async (values) => {
    // TODO: Add changePassword function from '../../../auth/Auth' and set error message (setError)
    setOpenSnackbar(true)
    reset()
  }

  return (
    <Paper square elevation={0} className={classes.root}>
      <Typography variant="h5">Change Password</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Controller
              as={TextField}
              control={control}
              name="oldPassword"
              label="Current Password"
              type="password"
              variant="standard"
              error={Boolean(errors.oldPassword)}
              helperText={errors.oldPassword && errors.oldPassword?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.fieldsWrapper}>
            <Controller
              as={TextField}
              control={control}
              name="newPassword"
              type="password"
              variant="standard"
              error={Boolean(errors.newPassword)}
              helperText={errors.newPassword && errors.newPassword?.message}
            />
          </Grid>
        </Grid>
        <Button type="submit" className={classes.button}>
          Confirm
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" className={classes.updateSuccess} onClose={handleSnackbarClose}>
          Password Updated
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default ChangePasswordForm
