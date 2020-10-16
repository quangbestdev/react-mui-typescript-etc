import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Grid, TextField, Box, IconButton, Typography, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import { Alert } from '@material-ui/lab'
import { StatusEnum } from '@onextech/etc-api'
import { useLazyListDiscounts } from '../../graphql/discount/queries'
import { DEFAULT_LIMIT } from '../../graphql/constants'
import { useCurrentCart } from '../../graphql/cart'
import { getIsDiscountValid, getDiscountValidationMessage } from './utils'
import Form from '../../components/Form'
import { DiscountInterface } from '../../graphql/discount/typings'
import { formatCurrency } from '../../utils/utils'

const useStyles = makeStyles((theme) => ({
  promoCodeTitle: {
    color: theme.palette.primary.light,
    fontWeight: 700,
  },
  promoCodeTextField: {
    width: 140,
    height: 40,
    borderRadius: 5,
    color: theme.palette.text.light,
    fontSize: theme.typography.pxToRem(14),
    margin: theme.spacing(1, 0),
  },
  promoCodeIcon: {
    width: 20,
    height: 20,
    marginLeft: theme.spacing(0.5),
  },
  discountContainer: {
    marginTop: theme.spacing(2),
  },
  discountTitle: {
    fontWeight: 400,
    color: theme.palette.text.secondary,
  },
  discountWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  discount: {
    fontWeight: 600,
    textAlign: 'right',
    color: theme.palette.success.main,
  },
  alert: {
    marginTop: theme.spacing(2),
  },
  discountChips: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      marginRight: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
  },
}))

interface DiscountFormProps extends Omit<React.ComponentProps<typeof Form>, 'onSubmit'> {
  onSubmit: (discounts: DiscountInterface[]) => void
  discounts: DiscountInterface[]
  discountAmount: number
}

const DiscountForm: React.FC<DiscountFormProps> = (props) => {
  const classes = useStyles()
  const { onSubmit, className, discounts, discountAmount, ...rest } = props

  const [isDiscountValid, setIsDiscountValid] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')

  // Init form
  const form = useForm({ defaultValues: { code: '' } })
  const { handleSubmit, control, reset, formState } = form

  // Hooks
  const { cartItems } = useCurrentCart()
  const total = cartItems.reduce((acc, { quantity, variant }) => acc + quantity * (variant?.price ?? 0), 0)
  /**
   * Handle Discount:
   * Current implementation assume the discount has to apply to the entire order and everyone
   */
  const { handleListDiscounts } = useLazyListDiscounts({
    onCompleted: (data) => {
      const discount = data?.listDiscounts?.items?.[0]

      const nextIsDiscountValid = getIsDiscountValid(cartItems, total, discount)
      const nextValidationMessage = getDiscountValidationMessage(cartItems, total, discount)

      setIsDiscountValid(nextIsDiscountValid)
      setValidationMessage(nextValidationMessage)

      if (nextIsDiscountValid) {
        onSubmit(discounts.concat(discount))
        reset({ code: '' })
      }
    },
    // This allows the customer to re-enter the applied code that they just removed
    fetchPolicy: 'network-only',
  })

  // Submit form
  const onFormSubmit = (values) => {
    const { code } = values

    // Pasted code doesn't make form dirty and won't get submitted (same for 'touched')
    // so need additional condition to check if 'code' has value
    if (!formState.dirty && !code) return
    const isDuplicateDiscount = Boolean(discounts.find((discount) => discount.code === code))
    if (isDuplicateDiscount) return

    handleListDiscounts({
      variables: {
        limit: DEFAULT_LIMIT,
        filter: {
          code: {
            eq: code,
          },
          status: {
            eq: StatusEnum.published,
          },
        },
      },
    })
  }

  const handleDeleteDiscount = (discountID) => {
    const nextDiscounts = discounts.filter(({ id }) => id !== discountID)
    onSubmit(nextDiscounts)
  }

  const handleCloseValidationMessage = () => {
    setValidationMessage('')
    reset({ code: '' })
  }

  return (
    <Box className={className}>
      <form onSubmit={handleSubmit(onFormSubmit)} {...rest}>
        <Typography variant="button" className={classes.promoCodeTitle}>
          Promo code
        </Typography>
        <Box display="flex">
          <Controller
            as={
              <TextField
                variant="outlined"
                InputProps={{
                  className: classes.promoCodeTextField,
                  endAdornment: (
                    <IconButton type="submit" size="small">
                      <PlayCircleFilledIcon className={classes.promoCodeIcon} />
                    </IconButton>
                  ),
                }}
              />
            }
            control={control}
            name="code"
            fullWidth
          />
        </Box>
        {Boolean(discounts.length) && (
          <Grid className={classes.discountContainer} container>
            <Grid item xs={6}>
              <Typography className={classes.discountTitle} variant="button">
                Discount
              </Typography>
            </Grid>
            <Grid className={classes.discountWrapper} item xs={6}>
              <Typography variant="button" className={classes.discount}>
                -{formatCurrency(discountAmount)}
              </Typography>
            </Grid>
          </Grid>
        )}
        {Boolean(validationMessage) && (
          <Alert
            onClose={handleCloseValidationMessage}
            severity={isDiscountValid ? 'success' : 'error'}
            className={classes.alert}
          >
            {validationMessage}
          </Alert>
        )}
        {Boolean(discounts.length) && (
          <Box className={classes.discountChips}>
            {discounts?.map(({ id, code }) => (
              <Chip
                key={id}
                label={code}
                color="primary"
                variant="outlined"
                onDelete={() => handleDeleteDiscount(id)}
              />
            ))}
          </Box>
        )}
      </form>
    </Box>
  )
}

export default DiscountForm
