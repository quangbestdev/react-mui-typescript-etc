import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, IconButton, InputBase, FormHelperText } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import SkinQuizLayout from './SkinQuizLayout'

const USERNAME_EXISTS_EXCEPTION = 'UsernameExistsException'

const useStyles = makeStyles((theme) => ({
  block: {
    backgroundImage: `url(
        '/quiz/mortar-and-pestle.png'
      )`,
    backgroundPosition: 'center bottom',
    backgroundSize: 350,
    backgroundRepeat: 'no-repeat',
    position: 'fixed',
    height: '80vh',
    [theme.breakpoints.up('md')]: {
      backgroundPosition: `right bottom ${theme.spacing(5)}px`,
    },
  },
  header: {
    margin: theme.spacing(10, 0, 5),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(20),
    },
  },
  buttonIcon: {
    border: `1.5px solid ${theme.palette.secondary.main}`,
    borderRadius: 20,
    padding: theme.spacing(0.4),
  },
  input: {
    flexGrow: 1,
  },
  inputWrapper: {
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.border.main}`,
    borderRadius: 5,
    paddingLeft: theme.spacing(2.5),
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      width: 370,
    },
  },
  helperText: {
    textAlign: 'center',
  },
  loginBtn: {
    fontWeight: 600,
    marginLeft: theme.spacing(0.25),
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
}))

const SkinQuizPassword = (props) => {
  const classes = useStyles(props)
  const { next, useUserData, useGuestAuthError, handleGuestLogin, handleGuestSignUp } = props

  const { isAuthenticated, userData, setUserData } = useUserData()

  useEffect(() => {
    if (isAuthenticated) next()
  }, [])

  // Authentication Error
  const { guestAuthError } = useGuestAuthError()
  const hasError = Boolean(guestAuthError)

  // Mange password input state
  const [password, setPassword] = useState('')
  const handleChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setUserData((prevUserData) => ({ ...prevUserData, password }))
    handleGuestSignUp({ ...userData, password })
  }

  return (
    <SkinQuizLayout className={classes.block}>
      <Box maxWidth={530}>
        <Typography variant="h3" className={classes.header}>
          Create a Password to Keep Your Data Secure
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box className={classes.inputWrapper}>
            <InputBase
              className={classes.input}
              value={password}
              onChange={handleChange}
              required
              placeholder="Enter Your Password"
              type="password"
              error={hasError}
              autoFocus
            />
            <IconButton color="secondary" type="submit">
              <ArrowForwardIosIcon className={classes.buttonIcon} />
            </IconButton>
          </Box>
          {hasError && (
            <FormHelperText className={classes.helperText}>
              {guestAuthError?.message}
              <span className={classes.loginBtn} onClick={handleGuestLogin}>
                {guestAuthError?.name === USERNAME_EXISTS_EXCEPTION && 'Login?'}
              </span>
            </FormHelperText>
          )}
        </form>
      </Box>
    </SkinQuizLayout>
  )
}

export default SkinQuizPassword
