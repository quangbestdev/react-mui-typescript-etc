import React from 'react'
import { Box, Button, Container, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BookTicketModal from './Modals/BookTicketModal'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    height: 570,
    backgroundImage: `url(${'/visit/mini_choc_bar_many.jpg'})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiTypography-root': {
      textAlign: 'center',
    },
  },
  title: {
    color: theme.palette.common.white,
  },
  subtitle: {
    color: theme.palette.common.white,
    fontSize: theme.typography.pxToRem(20),
    fontWeight: 500,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    maxWidth: 270,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 340,
      textAlign: 'left',
    },
  },
  button: {
    padding: theme.spacing(1, 5),
  },
}))

const Highlight = (props) => {
  const classes = useStyles(props)

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Box className={classes.content}>
        <Typography variant="h2" className={classes.title}>
          Book Your Factory Tour
        </Typography>

        <Typography variant="body1" className={classes.subtitle}>
          Embark on the most delicious journey you’ll ever take
        </Typography>
        <BookTicketModal
          toggle={(show) => (
            <Button className={classes.button} onClick={show} variant="contained" color="secondary">
              Book now
            </Button>
          )}
        />
      </Box>
    </Container>
  )
}

export default Highlight
