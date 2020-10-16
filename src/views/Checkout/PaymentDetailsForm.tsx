import React from 'react'
import clsx from 'clsx'
import { getInvoiceNumber } from '@onextech/etc-kit/utils'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import { API } from 'aws-amplify'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography, Theme } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {
  PartitionEnum,
  PaymentStatusEnum,
  FulfillmentStatusEnum,
  OrderTypeEnum,
  EventStatusEnum,
  UserTypeEnum,
  StatusEnum,
} from '@onextech/etc-api'
import { useForm, Controller } from 'react-hook-form'
import { CardNumberField, CardExpiryField, CardCvcField, StripePaymentFormWrapper } from '../../components/Form/Payment'
import { useCreateOrder } from '../../graphql/order'
import { useCurrentCart, CartItemInterface } from '../../graphql/cart'
import { useAuth } from '../../auth'
import config from '../../config'
import useUpdateDiscount from '../../graphql/discount/mutations/useUpdateDiscount'
import { DiscountInterface } from '../../graphql/discount/typings'
import {
  getDiscountAmount,
  getIsDiscountValid,
  getOrderedPrice,
  getLines,
  getEventlines,
  isTicketsInStock,
  getUpdateTicketsOrdered,
  handleEventOrderEmail,
  handleProductOrderEmail,
  printEventDate,
} from './utils'
import { useUpdateEvent } from '../../graphql/event'
import { useListUsers } from '../../graphql/user'
import { getDeleteCartedVariantQuantity } from '../../graphql/cart/utils'
import { useUpdateVariant } from '../../graphql/variant'

interface PaymentDetailsFormProps {
  className?: string
  discounts: DiscountInterface[]
  eventItem?: any
  billingDetails: any
  onSuccess?: () => void
  handleTicketOutOfStock?: () => void
}

interface PaymentDetailsFormValues {
  cardNumber: boolean
  cardExpiry: boolean
  cardCvc: boolean
  isDefaultAddress?: boolean
  address?: string
  zip?: string
  city?: string
  generic?: string
}

const paymentDetailsFormSchema = yup.object().shape({
  cardNumber: yup
    .boolean()
    .required('Card Number is required')
    .oneOf([true], 'Card Number must be valid'),
  cardExpiry: yup
    .boolean()
    .required('Expiration is required')
    .oneOf([true], 'Expiration must be valid'),
  cardCvc: yup
    .boolean()
    .required('CVC is required')
    .oneOf([true], 'CVC must be valid'),
})

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    background: theme.palette.background.paper,
    padding: theme.spacing(4.5, 5.25),
    width: 'auto',
  },
  header: {
    fontWeight: 700,
    fontFamily: theme.typography.fontFamily,
  },
  field: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
    },
    '& input': {
      padding: theme.spacing(1.5, 0),
      fontSize: theme.typography.pxToRem(16),
    },
    '& .MuiFormLabel-root': {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  buttonWrapper: {
    margin: theme.spacing(1.5, 0),
  },
  imagesWrapper: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiGrid-item': {
      paddingTop: 0,
    },
  },
  image: {
    objectFit: 'contain',
    maxHeight: theme.typography.pxToRem(23),
    marginRight: theme.spacing(1.5),
  },
  altImage: {
    objectFit: 'contain',
    maxHeight: theme.typography.pxToRem(38),
    marginRight: theme.spacing(1.5),
  },
  billingAddressWrapper: {
    marginBottom: theme.spacing(2),
  },
  billingAddressLabel: {
    color: theme.palette.text.secondary,
    fontWeight: 600,
  },
  spacer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = (props) => {
  const { className, discounts, eventItem, billingDetails, onSuccess, handleTicketOutOfStock, ...rest } = props
  const classes = useStyles()
  const { watch, control, formState, handleSubmit, errors, setError, clearError } = useForm<PaymentDetailsFormValues>({
    validationSchema: paymentDetailsFormSchema,
  })
  const { isSubmitting } = formState

  const isDefaultAddress = watch('isDefaultAddress')
  const billingAddress = watch('address')
  const billingZip = watch('zip')
  const billingCity = watch('city')

  const { cartItems, handleDeleteCartItem } = useCurrentCart()
  const { handleUpdateEvent } = useUpdateEvent()
  const { user } = useAuth()
  const isEvent = Boolean(eventItem)

  // Get admin users
  const { users } = useListUsers({
    variables: {
      filter: {
        type: {
          eq: UserTypeEnum.admin,
        },
        status: {
          eq: StatusEnum.published,
        },
      },
      limit: config.arbitraryQueryLimit,
    },
  })

  // Pricing
  const subtotal = cartItems.reduce((acc, { quantity, variant }) => acc + quantity * (variant?.price ?? 0), 0)
  // Amount to be deducted from subtotal
  const areDiscountsValid =
    discounts?.length > 0 && discounts?.every((discount) => getIsDiscountValid(cartItems, subtotal, discount))
  const discountAmount = areDiscountsValid
    ? discounts.reduce((amount, discount) => amount + getDiscountAmount(subtotal, discount), 0)
    : 0

  const totalBeforeShippingFee = eventItem
    ? getOrderedPrice(eventItem.event?.tickets, eventItem.values)
    : subtotal - discountAmount
  const shipping = eventItem || totalBeforeShippingFee >= config.shippingFee.threshold ? 0 : config.shippingFee.value
  const total = totalBeforeShippingFee + shipping

  const discountInputs = discounts?.map((discount) => {
    const { id: discountID, redeemedUsers, redeemedCount, redeemedSales, redeemedDiscount } = discount
    const nextRedeemedUser = { id: user?.id, title: user?.username }
    const discountInput = {
      id: discountID,
      redeemedUsers: redeemedUsers ? redeemedUsers.concat([nextRedeemedUser as any]) : [nextRedeemedUser],
      redeemedCount: redeemedCount ? redeemedCount + 1 : 1,
      redeemedSales: redeemedSales ? redeemedSales + total : total,
      redeemedDiscount: redeemedDiscount ? redeemedDiscount + discountAmount : discountAmount,
    }
    return discountInput
  })
  const discountCodes = discounts?.map(({ code }) => ({ code }))

  const hasRecipientInfo = billingDetails?.recipientName || billingDetails?.recipientMobile

  const orderInput = {
    lines: isEvent ? getEventlines(eventItem) : getLines(cartItems),
    total,
    pricing: isEvent
      ? { subtotal: total, shipping, total, discount: discountAmount }
      : { subtotal, shipping, total, discount: discountAmount },
    discounts: discountCodes?.length ? discountCodes : null,
    paymentStatus: PaymentStatusEnum.paid,
    fulfillmentStatus: FulfillmentStatusEnum.confirmed,
    eventStatus: isEvent ? EventStatusEnum.CONFIRMED : null,
    invoiceNo: getInvoiceNumber({ customerName: user?.name }),
    userID: user?.id,
    type: isEvent ? OrderTypeEnum.EVENT : OrderTypeEnum.DEFAULT,
    eventDate: isEvent ? printEventDate(eventItem.values.eventDate) : null,
    typeFilter: isEvent ? OrderTypeEnum.EVENT : OrderTypeEnum.DEFAULT,
    fulfillmentInfo: {
      customerInfo: {
        name: user?.name,
        email: user?.email,
        mobile: user?.mobile,
      },
      recipientInfo: hasRecipientInfo
        ? { name: billingDetails?.recipientName, mobile: billingDetails?.recipientMobile }
        : null,
      shippingAddress: user?.address,
      billingAddress: user?.address ?? user?.billingAddress,
      note: null,
    },
    note: billingDetails?.note,
    partition: PartitionEnum.PARTITION,
  }
  const stripe = useStripe()
  const elements = useElements()
  // Stripe.js has not yet loaded.
  // Make sure to disable form submission until Stripe.js has loaded.
  const isStripeLoaded = stripe && elements

  const { handleCreateOrder } = useCreateOrder()
  const { handleUpdateDiscount } = useUpdateDiscount()
  const { handleUpdateVariant } = useUpdateVariant()

  const updateVariantStock = async (cartID: string, cartItems: CartItemInterface[]) => {
    // Get cartItem based on cartID
    const cartItem = cartItems.find(({ id }) => id === cartID)
    // Get quantity of variant.carted in this cartItem
    const cartQuantity = getDeleteCartedVariantQuantity(cartItem?.variant, cartID)
    // Get stock count for this variant in this cartItem
    const variantStock = cartItem?.variant?.stock
    // Null value for stocks which are not set yet
    const stockLeft = variantStock ? variantStock - cartQuantity : null

    // Reduce the variant stock count
    return handleUpdateVariant({
      id: cartItem?.variant?.id,
      stock: stockLeft,
    })
  }

  const onSubmit = async () => {
    try {
      // Check for stock one last time
      if (isEvent && !isTicketsInStock(eventItem?.totalQuantity, eventItem?.selectedTickets, eventItem?.values)) {
        if (handleTicketOutOfStock) return handleTicketOutOfStock()
      }

      const response = await API.post('stripe', '/checkout/pay', {
        body: {
          amount: total * 100, // This is in cents i.e. $5.50
          currency: 'sgd',
        },
      })

      const { client_secret } = response

      const { firstName, email, mobile } = billingDetails

      const onPayment = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement('cardNumber'),
          billing_details: {
            name: firstName,
            email,
            phone: mobile,
            address: {
              line1: isDefaultAddress || isEvent ? billingDetails.address : billingAddress,
              line2: '',
              postal_code: isDefaultAddress || isEvent ? billingDetails.zip : billingZip,
              city: isDefaultAddress || isEvent ? billingDetails.city : billingCity,
              // FIXME: Stripe only accepts SG, not Singapore, so will need to update
              country: 'SG',
            },
          },
        },
      })

      if (onPayment.error || onPayment.paymentIntent.status !== 'succeeded') {
        // TODO: Show error to your customer (e.g., insufficient funds)
        throw new Error(onPayment.error?.message || onPayment.paymentIntent.status)
      }

      // Fire order email
      const onCreate = await handleCreateOrder(orderInput)
      if (areDiscountsValid) {
        await Promise.all(discountInputs.map((discountInput) => handleUpdateDiscount(discountInput)))
      }

      const {
        errors,
        data: { createOrder: createdOrder },
      } = onCreate

      if (errors && errors.length) throw new Error('An error has occurred.')

      if (isEvent) {
        handleUpdateEvent({
          id: eventItem?.event?.id,
          tickets: getUpdateTicketsOrdered(
            eventItem?.values,
            eventItem?.event?.tickets,
            onCreate?.data?.createOrder?.id
          ),
        })
        handleEventOrderEmail(createdOrder, users)
      } else {
        handleProductOrderEmail(createdOrder, users)
        await Promise.all(
          cartItems.map(({ id }) => Promise.all([updateVariantStock(id, cartItems), handleDeleteCartItem({ id })]))
        )
      }

      if (onSuccess) return onSuccess()
    } catch (err) {
      console.error('Error at PaymentDetailsForm.handleSubmit', err)
      setError('generic', null, err.message)
    }
  }

  return (
    <form {...rest} className={clsx(classes.form, className)} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.header}>
            Secure Credit Card Payment
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.imagesWrapper}>
          <img src="payments/visa-logo.png" alt="visa-logo" className={classes.image} />
          <img src="payments/mastercard-logo.png" alt="mastercard-logo" className={classes.altImage} />
          <img src="payments/american-express-logo.png" alt="american-express-logo" className={classes.image} />
        </Grid>
        <Grid item xs={12} md={10} className={classes.field}>
          <Controller
            as={CardNumberField}
            control={control}
            name="cardNumber"
            wrapper={{ error: Boolean(errors.cardNumber), helperText: errors.cardNumber?.message }}
          />
        </Grid>
        <Grid item xs={12} md={5} className={classes.field}>
          <Controller
            as={CardExpiryField}
            control={control}
            name="cardExpiry"
            wrapper={{ error: Boolean(errors.cardExpiry), helperText: errors.cardExpiry?.message }}
          />
        </Grid>
        <Grid item xs={12} md={5} className={classes.field}>
          <Controller
            as={CardCvcField}
            control={control}
            name="cardCvc"
            wrapper={{ error: Boolean(errors.cardCvc), helperText: errors.cardCvc?.message }}
          />
        </Grid>

        <Grid item xs={12}>
          {/* Billing Address Confirmation */}
          {!isEvent && (
            <Controller
              control={control}
              name="isDefaultAddress"
              defaultValue
              as={
                <FormControlLabel
                  control={<Checkbox checked={isDefaultAddress} name="isDefaultAddress" color="primary" />}
                  label={
                    <Typography variant="subtitle1" className={classes.billingAddressLabel}>
                      My billing address is the same as the delivery address
                    </Typography>
                  }
                />
              }
            />
          )}
          {/* Billing Address Fields */}
          {!isEvent && !isDefaultAddress && (
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.field}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="Billing Address"
                  name="address"
                  placeholder="Enter your address"
                />
              </Grid>
              <Grid item xs={12} md={6} className={classes.field}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="Billing Postal Code"
                  name="zip"
                  placeholder="Enter your postal code"
                />
              </Grid>
              <Grid className={classes.spacer} item md={6} />
              <Grid item xs={12} md={6} className={classes.field}>
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  label="City"
                  name="city"
                  placeholder="Enter your city"
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        {Boolean(errors.generic) && (
          <Grid item xs={12} md={10}>
            <Alert onClose={() => clearError('generic')} severity="error">
              {errors.generic.message}
            </Alert>
          </Grid>
        )}
        {/* Confirm and Pay */}
        <Grid item xs={12}>
          <Box className={classes.buttonWrapper}>
            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting || !isStripeLoaded}>
              Confirm &amp; Pay
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

const PaymentDetailsFormWrapper = (props) => {
  return (
    <StripePaymentFormWrapper>
      <PaymentDetailsForm {...props} />
    </StripePaymentFormWrapper>
  )
}

export default PaymentDetailsFormWrapper
