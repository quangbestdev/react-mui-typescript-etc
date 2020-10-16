import React from 'react'
import Router from 'next/router'
import { Box, Button, Container, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../../components/Layout/Layout'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    background: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(8.75),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(3),
    },
  },
  green: {
    color: theme.palette.success.main,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  header: {
    margin: theme.spacing(2.5, 0),
    textAlign: 'center',
  },
  text: {
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    lineHeight: 1.3,
  },
  button: {
    padding: theme.spacing(1.25, 8),
    marginBottom: theme.spacing(10),
  },
  image: {
    maxHeight: 77,
    width: 'auto',
    margin: theme.spacing(10, 0, 2),
  },
}))

const OrderSuccess: React.FC = (props) => {
  const classes = useStyles(props)

  const handleClick = async () => {
    Router.push('/orders')
  }

  return (
    <Layout title="Order Success">
      <Box className={classes.wrapper}>
        <Container maxWidth="lg" className={classes.contentWrapper}>
          <img src="/orders/success.png" className={classes.image} />
          <Typography variant="subtitle1" className={classes.green}>
            Order Confirmed
          </Typography>
          <Typography variant="h3" className={classes.header}>
            Payment successful, your order is on its way.
          </Typography>
          <Box maxWidth={750}>
            <Typography variant="body1" className={classes.text}>
              Thank you for your order, we have sent you an order confirmation email. You may also view your order
              history from My Orders page.
            </Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={handleClick} className={classes.button}>
            View Orders
          </Button>
        </Container>
      </Box>
    </Layout>
  )
}

export default OrderSuccess
