import React from 'react'
import { Theme, Typography, Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import { S3Image } from '@onextech/gvs-kit/core'
import Accordion from './Accordion'
import ProductSummaryForm from '../views/Shop/components/ProductSummaryForm'

const useStyles = makeStyles((theme: Theme) => ({
  infoBox: {
    '& > .MuiBox-root': {
      display: 'flex',
    },
    '& > .MuiTypography-root:last-child': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  pricing: {
    fontWeight: 900,
    fontFamily: theme.typography.fontFamily,
  },
  options: {
    alignItems: 'center',
    margin: theme.spacing(3, 0),
    '& .MuiTypography-root': {
      fontWeight: 600,
      marginRight: theme.spacing(2),
    },
  },
  feature: {
    marginBottom: theme.spacing(2),
    '& > .MuiTypography-root': {
      fontWeight: 600,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing(1.5),
    },
  },
  description: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(3),
  },
  accordionTitle: {
    '& > .MuiBox-root .MuiExpansionPanel-root .MuiExpansionPanelSummary-root .MuiTypography-root': {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.h6.fontSize,
    },
  },
  ingredientWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
    },
  },
  ingredientImage: {
    width: 100,
    maxWidth: '100%',
  },
  addToBag: {
    padding: theme.spacing(1, 4),
    marginBottom: theme.spacing(3),
  },
}))

const ProductSummary = (props) => {
  const { product, handleAddToCart } = props
  const { description, ingredients, instructions } = product
  const features = product?.features ?? []
  const keyIngredients = product?.keyIngredients ?? []
  const classes = useStyles(props)

  return (
    <Grid container>
      <Grid item xs={12}>
        <ProductSummaryForm handleAddToCart={handleAddToCart} product={product} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Box className={classes.infoBox}>
          {Boolean(features.length) &&
            features.map((feature) => (
              <Box className={classes.feature}>
                <CheckCircleOutlinedIcon />
                <Typography variant="body1">{feature}</Typography>
              </Box>
            ))}
          <Typography variant="body1" className={classes.description}>
            {description}
          </Typography>
        </Box>
        <Box className={classes.accordionTitle}>
          <Accordion
            items={[
              {
                label: 'Key Ingredients',
                content: (
                  <Grid container spacing={1}>
                    {Boolean(keyIngredients.length) &&
                      keyIngredients.map((ingredient) => (
                        <Grid key={ingredient.title} className={classes.ingredientWrapper} item xs={12} md={3}>
                          <S3Image className={classes.ingredientImage} path={ingredient.media?.[0]?.src} />
                          <Typography variant="subtitle2">{ingredient.title}</Typography>
                        </Grid>
                      ))}
                  </Grid>
                ),
              },
              {
                label: 'Full List of Ingredients',
                // Hide panel when ingredient list is empty
                hidden: Boolean(!ingredients),
                content: (
                  <>
                    <Typography variant="subtitle2">{ingredients}</Typography>
                  </>
                ),
              },
              {
                label: 'Directions',
                content: (
                  <>
                    <Typography variant="subtitle2">{instructions}</Typography>
                  </>
                ),
              },
            ]}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

export default ProductSummary
