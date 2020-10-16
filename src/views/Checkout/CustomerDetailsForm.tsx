import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Checkbox, FormControlLabel, Grid, TextField, Typography, Theme } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import Button from '../../components/Button'
import { useAuth } from '../../auth'

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    background: theme.palette.background.paper,
    padding: theme.spacing(4.5, 5.25),
    width: 'auto',
  },
  header: {
    fontWeight: 700,
    margin: theme.spacing(1, 0),
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
  },
  loginPrompt: {
    color: theme.palette.text.hint,
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  loginLink: {
    color: theme.palette.primary.main,
    textTransform: 'none',
    padding: 0,
    letterSpacing: 0,
    minWidth: 0,
    lineHeight: 1,
    marginLeft: theme.spacing(1),
    // Change fontSize of button
    fontSize: theme.typography.pxToRem(16),
  },
  field: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
    },
    '& input': {
      padding: theme.spacing(1.5, 0),
      fontSize: theme.typography.pxToRem(16),
    },
    '& .MuiInputLabel-root': {
      fontSize: theme.typography.pxToRem(16),
    },
    '& .MuiFormLabel-root': {
      fontSize: theme.typography.pxToRem(16),
    },
    '& .MuiInputBase-input': {
      color: theme.palette.text.primary,
      fontSize: theme.typography.pxToRem(18),
      fontWeight: 400,
    },
  },
  giftCheckBox: {
    '& .MuiTypography-root': {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: 600,
    },
  },
  textArea: {
    '& .MuiFormLabel-root': {
      fontSize: theme.typography.pxToRem(16),
    },
    '& .MuiInputBase-input': {
      fontSize: theme.typography.pxToRem(18),
    },
  },
}))

const CustomerDetailsForm = (props) => {
  const { className, isEvent = false, handleUpdateBillingDetail } = props
  const { user, updateUser } = useAuth()
  const defaultValues = {
    email: user?.email,
    firstName: user?.name?.split(' ')?.[0] || '',
    lastName: user?.name?.split(' ')?.[1] || '',
    mobile: user?.mobile,
    address: user?.address?.line1,
    country: user?.address?.country,
    city: user?.address?.city,
    zip: user?.address?.zip,
    gift: false,
  }
  const { watch, control, formState, handleSubmit } = useForm({ defaultValues })

  const { isSubmitting } = formState
  const classes = useStyles()

  const values = watch()

  const onSubmit = () => {
    updateUser(values)
    if (handleUpdateBillingDetail) handleUpdateBillingDetail(values)
  }

  return (
    <form className={clsx(classes.form, className)} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={10}>
          <Typography variant="h5" className={classes.header}>
            Customer Information
          </Typography>

          {!user && (
            <Typography variant="subtitle1" className={classes.loginPrompt}>
              Already have an account?
              <Link href="/login" passHref>
                <Button variant="text" className={classes.loginLink}>
                  Log in
                </Button>
              </Link>
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={5} className={classes.field}>
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="Email"
            name="email"
            placeholder="Enter your email"
            required
            disabled
          />
        </Grid>

        <Grid item xs={12} md={5} />

        <Grid item xs={12} md={5} className={classes.field}>
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            required
          />
        </Grid>
        <Grid item xs={12} md={5} className={classes.field}>
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            required
          />
        </Grid>

        <Grid item xs={12} md={5} className={classes.field}>
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="Phone Number"
            name="mobile"
            type="number"
            placeholder="Enter your phone number"
            required
          />
        </Grid>

        <Grid item xs={12} md={10}>
          <Typography variant="h5" className={classes.header}>
            {isEvent ? 'Billing Address' : 'Delivery Address'}
          </Typography>
        </Grid>

        <Grid item xs={12} md={10} className={classes.field}>
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="Address"
            name="address"
            placeholder="Enter your address"
            required
          />
        </Grid>

        <Grid item xs={12} md={5} className={classes.field}>
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="Country"
            name="country"
            placeholder="Enter your country"
            required
          />
        </Grid>
        <Grid item xs={12} md={5} className={classes.field}>
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="City"
            name="city"
            placeholder="Enter your city"
            required
          />
        </Grid>
        <Grid item xs={12} md={5} className={classes.field}>
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="Postal Code"
            name="zip"
            type="number"
            placeholder="Enter your postal code"
            required
          />
        </Grid>

        {!isEvent && (
          <>
            <Grid item xs={12} md={10}>
              <Typography variant="subtitle1" color="textPrimary">
                *We deliver within 5 working days between 9am - 7pm
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.giftCheckBox}>
              <Controller
                control={control}
                name="gift"
                as={
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="This is a gift for a special someone."
                  />
                }
              />
            </Grid>
          </>
        )}

        {values.gift && (
          <>
            <Grid item xs={12} md={5} className={classes.field}>
              <Controller
                as={TextField}
                control={control}
                fullWidth
                label="Recipient Name"
                name="recipientName"
                placeholder="Enter your recipient name"
              />
            </Grid>
            <Grid item xs={12} md={5} className={classes.field}>
              <Controller
                as={TextField}
                control={control}
                fullWidth
                label="Recipient Mobile"
                name="recipientMobile"
                type="number"
                placeholder="Enter your recipient mobile"
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <Controller
                as={TextField}
                control={control}
                label="Recipient Message"
                name="note"
                className={classes.textArea}
                placeholder="Write a personal message for your recipient"
                multiline
                fullWidth
                rowsMax={4}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Button variant="contained" type="submit" color="primary" disabled={isSubmitting}>
            Continue
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default CustomerDetailsForm
