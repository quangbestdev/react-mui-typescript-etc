import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import AccountDetailsForm from './AccountDetailsForm'
import ChangePasswordForm from './ChangePasswordForm'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(6.25),
    flex: 1,
    '& > :not(:first-child)': {
      marginTop: theme.spacing(2.5),
    },
  },
}))

const AccountSettings = (props) => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <AccountDetailsForm />
      <ChangePasswordForm />
    </Box>
  )
}

export default AccountSettings
