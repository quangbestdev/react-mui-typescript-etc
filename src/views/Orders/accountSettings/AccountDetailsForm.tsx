import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Paper, Typography, Grid, Snackbar } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { TextField } from '@onextech/gvs-kit/core'
import { Alert } from '@material-ui/lab'
import { useAuth } from '../../../auth'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4.75, 5, 5),
  },
  form: {
    maxWidth: 630,
    marginTop: theme.spacing(1.75),
  },
  formSectionTitle: {
    marginTop: theme.spacing(3.75),
    marginBottom: theme.spacing(1.75),
  },
  fieldsWrapper: {
    marginTop: theme.spacing(3.5),
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
}))

const AccountDetailsForm = (props) => {
  const classes = useStyles()

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const handleSnackbarClose = () => setOpenSnackbar(false)

  const { user, updateUser } = useAuth()

  const { email, name, mobile, address } = user || {}
  const nameArray = name && name.split(' ')
  const defaultValues = {
    firstName: nameArray?.[0],
    lastName: nameArray?.[1],
    mobile,
    email,
    address: address?.line1,
    country: address?.country,
    state: address?.line2,
    city: address?.city,
    zip: address?.zip,
  }

  const form = useForm({ defaultValues })
  const { control, handleSubmit } = form

  const onSubmit = async (values) => {
    await updateUser(values)
    setOpenSnackbar(true)
  }

  return (
    <Paper square elevation={0} className={classes.root}>
      <Typography variant="h5">Account Details</Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Controller as={TextField} control={control} name="email" variant="standard" />
          </Grid>
        </Grid>
        <Grid container spacing={1} className={classes.fieldsWrapper}>
          <Grid item xs={6}>
            <Controller as={TextField} control={control} name="firstName" variant="standard" />
          </Grid>
          <Grid item xs={6}>
            <Controller as={TextField} control={control} name="lastName" variant="standard" />
          </Grid>
        </Grid>
        <Grid container spacing={1} className={classes.fieldsWrapper}>
          <Grid item xs={12} sm={6}>
            <Controller as={TextField} control={control} name="mobile" label="Phone Number" variant="standard" />
          </Grid>
        </Grid>

        <Typography variant="h5" className={classes.formSectionTitle}>
          Delivery Address
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Controller as={TextField} control={control} name="address" variant="standard" />
          </Grid>
        </Grid>
        <Grid container spacing={1} className={classes.fieldsWrapper}>
          <Grid item xs={6}>
            <Controller as={TextField} control={control} name="country" variant="standard" />
          </Grid>
          <Grid item xs={6}>
            <Controller as={TextField} control={control} name="city" variant="standard" />
          </Grid>
        </Grid>
        <Grid container spacing={1} className={classes.fieldsWrapper}>
          <Grid item xs={6}>
            <Controller as={TextField} control={control} name="state" variant="standard" />
          </Grid>
          <Grid item xs={6}>
            <Controller as={TextField} control={control} name="zip" label="Postal Code" variant="standard" />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" type="submit" className={classes.button}>
          Update
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        onClose={handleSnackbarClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" className={classes.updateSuccess} onClose={handleSnackbarClose}>
          Account Updated
        </Alert>
      </Snackbar>
    </Paper>
  )
}

export default AccountDetailsForm
