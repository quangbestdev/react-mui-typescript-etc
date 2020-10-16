import React from 'react'
import Link from 'next/link'
import { Box, Chip, IconButton, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { S3Image } from '@onextech/gvs-kit/core'
import { formatCurrency } from '../../utils/utils'
import { ProductInterface } from '../../graphql/product'

interface ProductCardStyles {
  isOutOfStock?: boolean
}

const useStyles = makeStyles<Theme, ProductCardStyles>((theme) => ({
  root: {
    textAlign: 'center',
    textDecoration: 'none',
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    opacity: ({ isOutOfStock }) => (isOutOfStock ? 0.3 : 1),
    borderRadius: `10px 10px 0 0`,
    height: 220,
    width: '100%',
    objectFit: 'cover',
  },
  noImageWrapper: {
    borderRadius: `10px 10px 0 0`,
    height: 220,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyWrapper: {
    position: 'relative',
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
    borderRadius: `0 0 10px 10px`,
    padding: theme.spacing(2, 4),
  },
  productTitle: {
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(18),
    marginBottom: theme.spacing(0.5),
  },
  productDescription: {
    color: theme.palette.text.hint,
    fontSize: theme.typography.pxToRem(15),
    marginBottom: theme.spacing(0.5),
  },
  productPrice: {
    fontWeight: 700,
    fontSize: theme.typography.pxToRem(18),
  },
  soldOutChip: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: theme.spacing(1.5),
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.primary.contrastText,
  },
  cardIconButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: theme.palette.error.dark,
    '& .MuiSvgIcon-root': {
      fontSize: theme.typography.pxToRem(30),
    },
  },
}))

interface ProductCardProps {
  product: ProductInterface
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product } = props
  const { slug, variants } = product
  const variantCount = variants?.items.length
  const isOutOfStock =
    variantCount === 1
      ? variants?.items?.[0]?.stock === 0
      : variants?.items?.filter(({ isPrimary }) => !isPrimary).every(({ stock }) => stock === 0)

  const classes = useStyles({ isOutOfStock })

  const content = (
    <Box className={classes.content}>
      {product?.media?.[0]?.src ? (
        <S3Image className={classes.image} src={product?.media?.[0]?.src} alt={product?.title} />
      ) : (
        <Box className={classes.noImageWrapper}>
          <Typography>No Product Image</Typography>
        </Box>
      )}
      <Box className={classes.bodyWrapper}>
        <Typography className={classes.productTitle}>{product?.title}</Typography>
        <Typography className={classes.productDescription}>{product?.category?.title}</Typography>
        <Typography className={classes.productPrice}>{formatCurrency(product?.variants?.items?.[0]?.price)}</Typography>
        {isOutOfStock ? (
          <Chip className={classes.soldOutChip} label="Sold Out" />
        ) : (
          <IconButton className={classes.cardIconButton}>
            <AddCircleOutlineIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  )

  if (!isOutOfStock)
    return (
      <Link href="/shop/[slug]" as={`/shop/${slug}`} passHref>
        <Box component="a" className={classes.root}>
          {content}
        </Box>
      </Link>
    )

  return <Box className={classes.root}>{content}</Box>
}

export default ProductCard
