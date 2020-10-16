import React from 'react'
import { Typography, Theme, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { S3Image } from '@onextech/gvs-kit/core'
import { formatCurrency } from '../../../utils/utils'
import { ProductInterface } from '../../../graphql/product/typing'

interface ProductCardProps {
  product: ProductInterface
  handleClick: (product: ProductInterface) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 416,
    objectFit: 'cover',
  },
  title: {
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.palette.primary.main,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(28),
    },
  },
  subtitle: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(20),
    },
  },
  price: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(22),
    },
  },
}))

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product, handleClick } = props
  const { media, title, subtitle, variants } = product
  const classes = useStyles()

  return (
    <Box className={classes.wrapper} onClick={() => handleClick(product)}>
      <S3Image className={classes.image} src={media?.[0]?.src} />
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        {subtitle}
      </Typography>
      <Typography variant="subtitle1" className={classes.price}>
        {formatCurrency(variants?.items?.[0]?.price)}
      </Typography>
    </Box>
  )
}

export default ProductCard
