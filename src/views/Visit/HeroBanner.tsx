import React from 'react'
import { Box, Button, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BookTicketModal from './Modals/BookTicketModal'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 570,
    backgroundImage: `url(${'/visit/factory_scene.jpg'})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: theme.spacing(7, 3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(15, 0, 0, 20),
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .MuiTypography-root': {
      color: theme.palette.common.white,
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
      },
    },
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  title: {
    width: 500,
  },
  subtitle: {
    width: 340,
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(20),
    margin: theme.spacing(2, 0, 6),
  },
  button: {
    padding: theme.spacing(1, 6),
  },
}))

const HeroBanner = (props) => {
  const classes = useStyles(props)

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Typography variant="h2" className={classes.title}>
          Book a Chocolate Factory Tour
        </Typography>

        <Typography variant="body1" className={classes.subtitle}>
          Step into Asia’s first open-concept chocolate factory and take a peek behind the scenes!
        </Typography>
        <BookTicketModal
          toggle={(show) => (
            <Button className={classes.button} onClick={show} variant="contained" color="secondary">
              Book now
            </Button>
          )}
        />
      </Box>
    </Box>
  )
}

export default HeroBanner
