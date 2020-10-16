import React from 'react'
import { Box, Grid, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { formatCurrency } from '../../../../utils/utils'
import { OrderInterface } from '../../../../graphql/order'

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 210,
    },
  },
  amountWrapper: {
    marginBottom: theme.spacing(1),
  },
  amountLabel: {
    fontWeight: 400,
    color: theme.palette.text.secondary,
  },
  amount: {
    textAlign: 'right',
    fontWeight: 600,
    color: theme.palette.text.secondary,
  },
  divider: {
    backgroundColor: theme.palette.text.secondary,
    margin: theme.spacing(1.5, 0),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

interface OrderItemTotalProps {
  order: OrderInterface
}

const OrderItemTotal: React.FC<OrderItemTotalProps> = ({ order }) => {
  const classes = useStyles()
  const { total, subtotal, shipping, discount } = order?.pricing || {}

  return (
    <Box className={classes.contentWrapper}>
      <Grid container className={classes.amountWrapper}>
        <Grid item xs={6}>
          <Typography className={classes.amountLabel}>Sub total: </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.amount}>{formatCurrency(subtotal)}</Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.amountWrapper}>
        <Grid item xs={6}>
          <Typography className={classes.amountLabel}>Shipping: </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.amount}>{formatCurrency(shipping)}</Typography>
        </Grid>
      </Grid>

      {Boolean(discount) && (
        <Grid container className={classes.amountWrapper}>
          <Grid item xs={6}>
            <Typography className={classes.amountLabel}>Discount: </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.amount}>{formatCurrency(discount)}</Typography>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>

      <Grid container className={classes.amountWrapper}>
        <Grid item xs={6}>
          <Typography className={classes.amountLabel}>Total: </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.amount}>{formatCurrency(total)}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderItemTotal
