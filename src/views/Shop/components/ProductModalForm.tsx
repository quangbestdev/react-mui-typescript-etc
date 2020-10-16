import React, { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GetProductInterface } from '../../../graphql/product'
import { getVariantAttrsFromVariants, disableOptionValuesForUnavailableVariants } from '../utils'
import RadioButtonsField from '../../../components/RadioButtonsField'
import NumberStepper from '../../../components/Form/NumberField/NumberStepper'
import Button from '../../../components/Button'
import { formatCurrency } from '../../../utils/utils'
import { VariantInterface } from '../../../graphql/variant'

interface ProductModalFormProps {
  handleAddToCart: (variant: VariantInterface, quantity: number) => void
  product?: GetProductInterface | null
}

interface ProductModalFormValues {
  [key: string]: string | number
  quantity: number
}

const useStyles = makeStyles((theme) => ({
  productPrice: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 900,
    color: theme.palette.text.secondary,
    margin: theme.spacing(1, 0, 2),
  },
  addToCartBtn: {
    borderRadius: 0,
    padding: theme.spacing(2, 7),
    marginBottom: theme.spacing(3),
  },
  sectionWrapper: {
    marginBottom: theme.spacing(3),
  },
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'capitalize',
  },
  sizeWrapper: {
    '&&& > * > button': {
      padding: theme.spacing(0.5, 1.5),
      borderRadius: theme.shape.borderRadius,
      marginRight: theme.spacing(1),
    },
  },
  controllerTitle: {
    marginBottom: theme.spacing(1),
  },
}))

const defaultValues = { quantity: 1 }

const ProductModalForm: React.FC<ProductModalFormProps> = (props) => {
  const { control, handleSubmit, formState, watch, errors } = useForm<ProductModalFormValues>({ defaultValues })
  const { isSubmitting } = formState
  const { handleAddToCart, product } = props

  const options = product?.options || []
  const variants = product?.variants?.items || []
  const values = watch()
  const classes = useStyles()
  const variantAttrs = useMemo(() => getVariantAttrsFromVariants(variants), [variants])

  const primaryVariant = variants?.find(({ isPrimary }) => isPrimary)
  const chosenVariant =
    variants.find((variant) => {
      const { attrs } = variant
      return attrs && attrs.every(({ title, value }) => values[title] === value)
    }) || primaryVariant
  const price = chosenVariant?.price ?? 0

  const onSubmit = () => {
    handleAddToCart(chosenVariant, values.quantity)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography className={classes.productPrice} variant="h4">
        {formatCurrency(price)}
      </Typography>
      {options.map((option) => (
        <Box key={option.title} className={classes.sectionWrapper}>
          <Grid container>
            <Grid item xs={12} sm={2} className={classes.labelWrapper}>
              <Typography variant="body1" className={classes.controllerTitle}>
                {option.title}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10} className={classes.sizeWrapper}>
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
        </Box>
      ))}
      <Box className={classes.sectionWrapper}>
        <Grid container>
          <Grid item xs={12} sm={2} className={classes.labelWrapper}>
            <Typography variant="body1" className={classes.controllerTitle}>
              Quantity
            </Typography>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Controller name="quantity" as={NumberStepper} control={control} rules={{ required: 'Required' }} min={1} />
          </Grid>
        </Grid>
      </Box>
      <Button className={classes.addToCartBtn} type="submit" disabled={isSubmitting}>
        Add To Cart
      </Button>
    </form>
  )
}

export default ProductModalForm
