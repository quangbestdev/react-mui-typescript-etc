import React from 'react'
import Link from 'next/link'
import { Button, Typography, Box } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(8.75),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(3),
    },
  },
  orderConfirmedTitle: {
    color: theme.palette.success.main,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  header: {
    margin: theme.spacing(2.5, 0),
    textAlign: 'center',
  },
  body: {
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    lineHeight: 1.3,
  },
  button: {
    textDecoration: 'none',
    padding: theme.spacing(1.25, 8),
    marginBottom: theme.spacing(10),
  },
  image: {
    maxHeight: 80,
    width: 'auto',
    margin: theme.spacing(10, 0, 2),
  },
}))

const BookTicketSuccess: React.FC = (props) => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.contentWrapper}>
        <img src="/orders/success.png" alt="success" className={classes.image} />
        <Typography variant="subtitle1" className={classes.orderConfirmedTitle}>
          Booking Confirmed
        </Typography>
        <Typography variant="h3" className={classes.header}>
          Payment successful, see you soon at the factory.
        </Typography>
        <Typography variant="body1" className={classes.body}>
          Thank you for your order, we have sent you a tour booking confirmation email. You may also view your tour
          booking history from My Orders page.
        </Typography>
        <Link href="/orders" passHref>
          <Button component="a" variant="contained" color="primary" className={classes.button}>
            View Orders
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default BookTicketSuccess
