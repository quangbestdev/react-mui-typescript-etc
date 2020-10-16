import React, { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Box, Typography, Grid, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { GetProductInterface } from '../../../graphql/product'
import { getVariantAttrsFromVariants, disableOptionValuesForUnavailableVariants } from '../utils'
import RadioButtonsField from '../../../components/RadioButtonsField'
import NumberStepper from '../../../components/Form/NumberField/NumberStepper'
import Button from '../../../components/Button'
import { formatCurrency } from '../../../utils/utils'
import { VariantInterface } from '../../../graphql/variant'

interface ProductSummaryFormProps {
  handleAddToCart: (variant: VariantInterface, quantity: number) => void
  product?: GetProductInterface | null
}

interface ProductSummaryFormValues {
  [key: string]: string | number
  quantity: number
}

const useStyles = makeStyles((theme) => ({
  productType: {
    textTransform: 'uppercase',
    fontWeight: 700,
    color: theme.palette.secondary.light,
    fontFamily: theme.typography.fontFamily,
    margin: theme.spacing(1.5, 0),
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    fontFamily: theme.typography.fontFamily,
  },
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
  mediumCartBtn: {
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2),
      padding: theme.spacing(1, 2.5),
    },
  },
}))

const defaultValues = { quantity: 1 }

const ProductSummaryForm: React.FC<ProductSummaryFormProps> = (props) => {
  const { control, handleSubmit, formState, watch, errors } = useForm<ProductSummaryFormValues>({ defaultValues })
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

  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Typography variant="body1" className={classes.productType}>
            {product?.category?.title}
          </Typography>
          <Typography variant="h4" className={classes.title}>
            {product?.title}
          </Typography>
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
                <Controller
                  name="quantity"
                  as={NumberStepper}
                  control={control}
                  rules={{ required: 'Required' }}
                  min={1}
                />
              </Grid>
            </Grid>
          </Box>
          {!isMediumScreen && (
            <Button className={classes.addToCartBtn} type="submit" disabled={isSubmitting}>
              Add To bag
            </Button>
          )}
        </Grid>
        {isMediumScreen && (
          <Grid item md={3}>
            <Button type="submit" className={classes.mediumCartBtn} disabled={isSubmitting}>
              Add to bag
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  )
}

export default ProductSummaryForm
