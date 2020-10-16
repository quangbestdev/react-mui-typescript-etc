import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Hidden, Theme } from '@material-ui/core'
import ProductSummary from '../../../components/ProductSummary'
import ImageCarousel from '../../../components/ImageCarousel'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(10),
    },
    marginTop: theme.spacing(4),
  },
  carouselWrapper: {
    '& img': {
      [theme.breakpoints.up('md')]: {
        height: 380,
      },
      [theme.breakpoints.down('sm')]: {
        height: 300,
      },
    },
  },
}))

const ProductInfo = (props) => {
  const classes = useStyles(props)

  const { product, handleAddToCart } = props

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={4} className={classes.carouselWrapper}>
        <ImageCarousel images={product?.media ?? []} />
      </Grid>
      <Hidden xsDown>
        <Grid item md={1} />
      </Hidden>
      <Grid item xs={12} md={7}>
        <ProductSummary product={product} handleAddToCart={handleAddToCart} />
      </Grid>
    </Grid>
  )
}

export default ProductInfo
