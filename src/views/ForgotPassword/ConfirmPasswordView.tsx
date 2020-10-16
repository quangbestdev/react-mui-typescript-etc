import React, { useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import { useRouter } from 'next/router'
import { Typography, Box, Button } from '@material-ui/core'
import Block from '../../components/Block'

const REDIRECT_TIMEOUT = 3000
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(6),
    '& > .MuiContainer-root': {
      padding: theme.spacing(3.5),
      borderRadius: 8,
      background: theme.palette.common.white,
    },
  },
  title: {
    marginBottom: theme.spacing(1.5),
  },
  icon: {
    fontSize: theme.typography.pxToRem(80),
  },
  body: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  button: {
    marginTop: theme.spacing(2.5),
  },
  confirmPasswordWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: theme.spacing(3, 0),
  },
}))

const ConfirmPasswordView = () => {
  const classes = useStyles()
  const router = useRouter()

  // Redirect to Login page
  useEffect(() => {
    setTimeout(() => router.push('/login'), REDIRECT_TIMEOUT)
  }, [])

  return (
    <Block container={{ maxWidth: 'xs' }} className={classes.root}>
      <Box className={classes.confirmPasswordWrapper}>
        <CheckCircleOutlineOutlinedIcon fontSize="large" color="primary" className={classes.icon} />
        <Typography variant="h6" color="primary">
          Password Updated!
        </Typography>
        <Typography variant="body2" className={classes.body}>
          Login now with your new password. If this page doesn't automatically redirect you to the login page within 5
          seconds, click the Login button below
        </Typography>
        <Button href="/login" color="primary" variant="contained" className={classes.button}>
          Login
        </Button>
      </Box>
    </Block>
  )
}

export default ConfirmPasswordView
