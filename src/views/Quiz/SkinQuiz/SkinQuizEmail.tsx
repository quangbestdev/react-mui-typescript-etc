import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, IconButton, Typography, InputBase } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import SkinQuizLayout from './SkinQuizLayout'

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
  form: {
    width: '100%',
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
}))

const SkinQuizEmail = (props) => {
  const { next, useUserData } = props
  const classes = useStyles(props)

  const { isAuthenticated, setUserData } = useUserData()
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (isAuthenticated) next()
  }, [])

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserData((prevUserData) => ({
      ...prevUserData,
      email,
    }))
    next()
  }

  return (
    <SkinQuizLayout className={classes.block}>
      <Box maxWidth={530}>
        <Typography variant="h3" className={classes.header}>
          Where should we send your skin assessment?
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Box className={classes.inputWrapper}>
            <InputBase
              className={classes.input}
              value={email}
              onChange={handleChange}
              required
              placeholder="Enter Your Email"
              type="email"
            />
            <IconButton color="secondary" type="submit">
              <ArrowForwardIosIcon className={classes.buttonIcon} />
            </IconButton>
          </Box>
        </form>
      </Box>
    </SkinQuizLayout>
  )
}

export default SkinQuizEmail
