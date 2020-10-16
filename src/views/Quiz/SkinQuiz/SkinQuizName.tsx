import React, { useState, useEffect } from 'react'
import { Box, IconButton, InputBase, Typography } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { makeStyles } from '@material-ui/core/styles'
import SkinQuizLayout from './SkinQuizLayout'

const useStyles = makeStyles((theme) => ({
  block: {
    backgroundImage: `url(
        '/quiz/cosmetic-set-for-skin-care-on-a-white-background-with-flowers-lilies.png'
      )`,
    backgroundPosition: 'center bottom',
    backgroundSize: '650px auto',
    backgroundRepeat: 'no-repeat',
    position: 'fixed',
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
  input: {
    flexGrow: 1,
  },
  header: {
    margin: theme.spacing(10, 0, 2.5),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(20),
    },
  },
  buttonIcon: {
    border: `1.5px solid ${theme.palette.secondary.main}`,
    borderRadius: 20,
    padding: theme.spacing(0.4),
  },
}))

const SkinQuizName = (props) => {
  const { next, useUserData } = props
  const classes = useStyles(props)

  const { isAuthenticated, setUserData } = useUserData()
  const [name, setName] = useState('')

  useEffect(() => {
    if (isAuthenticated) next()
  }, [])

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserData((prevUserData) => ({
      ...prevUserData,
      name,
    }))
    next()
  }

  return (
    <SkinQuizLayout className={classes.block}>
      <Typography variant="h3" className={classes.header}>
        What is your name?
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box className={classes.inputWrapper}>
          <InputBase
            className={classes.input}
            value={name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            required
          />
          <IconButton color="secondary" type="submit">
            <ArrowForwardIosIcon className={classes.buttonIcon} />
          </IconButton>
        </Box>
      </form>
    </SkinQuizLayout>
  )
}

export default SkinQuizName
