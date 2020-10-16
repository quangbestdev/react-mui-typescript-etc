import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import { formatCurrency } from '../../utils/utils'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: theme.palette.background.paper,
    padding: theme.spacing(4.5, 5.25),
    width: 'auto',
    borderRadius: 10,
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4.5, 3.5),
    },
  },
  header: {
    fontWeight: 700,
    marginBottom: theme.spacing(2.5),
  },
  row: {
    margin: theme.spacing(2.5, 0, 2),
  },
  cost: {
    fontWeight: 600,
    textAlign: 'right',
    color: theme.palette.text.primary,
  },
  finalRow: {
    marginBottom: theme.spacing(4),
    alignItems: 'center',
  },
  boldKey: {
    fontWeight: 700,
  },
  totalCost: {
    textAlign: 'right',
    fontWeight: 700,
  },
  checkOutButton: {
    padding: theme.spacing(1, 0),
    borderRadius: 20,
  },
}))

interface CartSummaryProps {
  // TODO: Typing
  cartItems: any
  onSubmit: () => void
}

const CartSummary: React.FC<CartSummaryProps> = (props) => {
  const classes = useStyles()
  const { cartItems, onSubmit } = props

  const totalCost = cartItems.reduce((total, cartItem) => {
    return total + (cartItem.variant?.price || 0) * cartItem.quantity
  }, 0)

  return (
    <Container className={classes.wrapper}>
      <Typography variant="h5" className={classes.header}>
        Order Summary
      </Typography>

      <Grid container className={classes.row}>
        <Grid item xs={8}>
          <Typography color="textSecondary" variant="subtitle1">
            Subtotal ({cartItems.length} items)
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1" className={classes.cost}>
            {formatCurrency(totalCost)}
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.finalRow}>
        <Grid item xs={6}>
          <Typography className={classes.boldKey} color="textSecondary">
            Total
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.totalCost}>{formatCurrency(totalCost)}</Typography>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        className={classes.checkOutButton}
        onClick={onSubmit}
        fullWidth
        disabled={!cartItems?.length}
      >
        Check Out
      </Button>
    </Container>
  )
}

export default CartSummary
