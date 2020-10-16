import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography } from '@material-ui/core'
import { formatCurrency } from '../../utils/utils'
import { useCurrentCart } from '../../graphql/cart'
import DiscountForm from './DiscountForm'
import { getDiscountAmount, getIsDiscountValid } from './utils'
import { DiscountInterface } from '../../graphql/discount/typings'
import config from '../../config'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: theme.palette.background.paper,
    padding: theme.spacing(4.5, 5.25),
    width: 'auto',
    marginBottom: theme.spacing(5),
  },
  header: {
    fontWeight: 700,
    marginBottom: theme.spacing(3.5),
    fontFamily: theme.typography.fontFamily,
  },
  row: {
    marginBottom: theme.spacing(2.5),
  },
  subtitle: {
    fontWeight: 600,
    color: theme.palette.text.secondary,
    lineHeight: 1.3,
  },
  cost: {
    textAlign: 'right',
    color: theme.palette.text.secondary,
  },
  finalRow: {
    marginBottom: theme.spacing(2.5),
    alignItems: 'center',
  },
  semibold: {
    fontWeight: 600,
  },
  orderSummaryTitle: {
    fontSize: theme.typography.button.fontSize,
    color: theme.palette.text.secondary,
  },
  orderSummaryCost: {
    fontSize: theme.typography.button.fontSize,
    color: theme.palette.text.primary,
    fontWeight: 600,
    textAlign: 'right',
  },
  totalCostTitle: {
    fontWeight: 700,
  },
  totalCost: {
    textAlign: 'right',
    fontWeight: 700,
    fontFamily: theme.typography.fontFamily,
  },
}))

interface OrderSummarySectionProps {
  onSubmitDiscounts: (discounts: DiscountInterface[]) => void
  discounts: DiscountInterface[]
}

const OrderSummarySection: React.FC<OrderSummarySectionProps> = ({ onSubmitDiscounts, discounts }) => {
  const classes = useStyles()

  const { cartItems } = useCurrentCart()

  const subtotal = cartItems.reduce((acc, { quantity, variant }) => acc + quantity * (variant?.price ?? 0), 0)
  // Amount to be deducted from subtotal
  const areDiscountsValid =
    discounts.length > 0 && discounts.every((discount) => getIsDiscountValid(cartItems, subtotal, discount))
  const discountAmount = areDiscountsValid
    ? discounts.reduce((amount, discount) => amount + getDiscountAmount(subtotal, discount), 0)
    : 0
  const totalBeforeShippingFee = subtotal - discountAmount
  const shipping = totalBeforeShippingFee >= config.shippingFee.threshold ? 0 : config.shippingFee.value
  const total = totalBeforeShippingFee + shipping

  return (
    <Container className={classes.wrapper}>
      <Typography variant="h4" className={classes.header}>
        Order Summary
      </Typography>

      {cartItems.map((cartItem) => {
        const { id, quantity, variant } = cartItem
        const title = variant?.product?.title
        const subtitle = variant?.title
        const price = variant?.price
        const cost = quantity * price || 0
        return (
          <Grid container className={classes.row} key={id}>
            <Grid item xs={2}>
              <Typography variant="subtitle1">{quantity} x</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" color="textSecondary">
                {title}
              </Typography>
              <Typography variant="subtitle1" className={classes.subtitle}>
                {subtitle !== 'Primary' && subtitle}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" className={classes.cost}>
                {formatCurrency(cost)}
              </Typography>
            </Grid>
          </Grid>
        )
      })}

      <Grid container className={classes.row}>
        <Grid item xs={6}>
          <Typography variant="body1" className={classes.orderSummaryTitle}>
            Subtotal ({cartItems.length} items)
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" className={classes.orderSummaryCost}>
            {formatCurrency(subtotal)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" color="textSecondary" className={classes.orderSummaryTitle}>
            Shipping Fee
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" className={classes.orderSummaryCost}>
            {formatCurrency(shipping)}
          </Typography>
        </Grid>
      </Grid>

      <DiscountForm
        onSubmit={onSubmitDiscounts}
        discounts={discounts}
        discountAmount={discountAmount}
        className={classes.row}
      />

      <Grid container className={classes.finalRow}>
        <Grid item xs={6}>
          <Typography variant="subtitle1" className={classes.totalCostTitle}>
            Total
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" className={classes.totalCost}>
            {formatCurrency(total)}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default OrderSummarySection
