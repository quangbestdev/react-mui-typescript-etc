import React, { useMemo, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { makeStyles } from '@material-ui/core/styles'
import RadioButtonsField from '../../components/RadioButtonsField'
import NumberStepper from '../../components/Form/NumberField/NumberStepper'
import { ProductInterface } from '../../graphql/product'
import { formatCurrency } from '../../utils/utils'
import { getVariantAttrsFromVariants, disableOptionValuesForUnavailableVariants } from './utils'
import { VariantInterface } from '../../graphql/variant'

interface ProductFormProps {
  handleAddToCart: (variant: VariantInterface, quantity: number) => void
  product?: ProductInterface
}

interface ProductFormValues {
  [key: string]: string | number
  quantity: number
}

const useStyles = makeStyles((theme) => ({
  price: {
    color: theme.palette.text.primary,
    fontWeight: 700,
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  title: {
    fontSize: theme.typography.button.fontSize,
    color: theme.palette.text.light,
    [theme.breakpoints.only('xs')]: {
      marginBottom: theme.spacing(2),
      textAlign: 'center',
    },
  },
  sectionWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
  },
  radioButtonsFieldWrapper: {
    '& > * > button': {
      marginRight: theme.spacing(1),
      [theme.breakpoints.only('xs')]: {
        margin: theme.spacing(0, 0, 1.5),
      },
    },
  },
  numberStepperWrapper: {
    [theme.breakpoints.only('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  actionButtonWrapper: {
    display: 'flex',
    marginTop: theme.spacing(3.5),
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center',
    },
  },
  addToCartButton: {
    padding: theme.spacing(1, 3),
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(1, 2),
    },
    '& .MuiButton-label .MuiSvgIcon-root': {
      color: theme.palette.common.white,
    },
  },
  icon: {
    color: theme.palette.icon,
  },
  formMessageText: {
    marginTop: theme.spacing(2),
    color: theme.palette.error.main,
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
}))

const defaultValues = { quantity: 1 }

const ProductForm: React.FC<ProductFormProps> = (props) => {
  const classes = useStyles()
  const { control, handleSubmit, formState, watch, errors } = useForm<ProductFormValues>({ defaultValues })
  const { isSubmitting } = formState
  const { product, handleAddToCart } = props

  const options = product?.options || []
  const variants = product?.variants?.items || []
  const values = watch()
  const variantAttrs = useMemo(() => getVariantAttrsFromVariants(variants), [variants])

  const primaryVariant = variants?.find(({ isPrimary }) => isPrimary)
  const chosenVariant =
    variants.find((variant) => {
      const { attrs } = variant
      return attrs && attrs.every(({ title, value }) => values[title] === value)
    }) || primaryVariant
  const price = chosenVariant?.price ?? 0

  const [isBoughtLastStock, setIsBoughtLastStock] = useState(false)
  const [isOutOfStock, setIsOutOfStock] = useState(false)
  const [formMessage, setFormMessage] = useState(null)

  const onSubmit = () => {
    handleAddToCart(chosenVariant, values.quantity)

    if (chosenVariant.stock - values.quantity < 1) {
      setIsBoughtLastStock(true)
    }
  }

  // Check for stock when changing variant or quantity
  useEffect(() => {
    if (!chosenVariant) return

    const cartedQuantity = chosenVariant.carted?.reduce((total, { quantity }) => total + quantity, 0) ?? 0
    const isNoStock = typeof chosenVariant.stock === 'number' && chosenVariant.stock - cartedQuantity < 1
    const isInsufficientStock = chosenVariant.stock && chosenVariant.stock - cartedQuantity - values?.quantity < 0

    if (!isBoughtLastStock && isNoStock) {
      setFormMessage('Sorry, item is out of stock')
      return setIsOutOfStock(true)
    }

    if (!isBoughtLastStock && isInsufficientStock) {
      setFormMessage('Insufficient stock available, please reduce quantity')
      return setIsOutOfStock(true)
    }

    setFormMessage(null)
    return setIsOutOfStock(false)
  }, [chosenVariant, values])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography className={classes.price} variant="body2">
        SGD {formatCurrency(price)}
      </Typography>
      {/* Options */}
      {options?.map((option) => (
        <Grid container key={option.title} className={classes.sectionWrapper}>
          <Grid item xs={12} sm={2}>
            <Typography className={classes.title} variant="body1">
              {option.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={10} className={classes.radioButtonsFieldWrapper}>
            <Controller
              name={option.title}
              as={RadioButtonsField}
              control={control}
              rules={{ required: 'Required' }}
              options={disableOptionValuesForUnavailableVariants(option, variantAttrs, values)}
              error={Boolean(errors[option.title] && errors[option.title]?.message)}
              helperText={errors[option.title] && errors[option.title]?.message}
            />
          </Grid>
        </Grid>
      ))}
      {/* Quantity */}
      <Grid container className={classes.sectionWrapper}>
        <Grid item xs={12} sm={2}>
          <Typography className={classes.title} variant="body1">
            Quantity
          </Typography>
        </Grid>
        <Grid className={classes.numberStepperWrapper} item xs={12} sm={10}>
          <Controller name="quantity" as={NumberStepper} control={control} rules={{ required: 'Required' }} min={1} />
        </Grid>
        {formMessage && (
          <Grid item xs={12} sm={10}>
            <Typography variant="subtitle2" className={classes.formMessageText}>
              {formMessage}
            </Typography>
          </Grid>
        )}
      </Grid>
      {/* Actions */}
      <Box className={classes.actionButtonWrapper}>
        <Button
          startIcon={<ShoppingCartIcon className={classes.icon} />}
          variant="contained"
          color="primary"
          className={classes.addToCartButton}
          type="submit"
          disabled={isSubmitting || isOutOfStock || isBoughtLastStock}
        >
          Add To Cart
        </Button>
      </Box>
    </form>
  )
}

export default ProductForm
