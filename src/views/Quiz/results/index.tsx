import React, { useState, useMemo } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Typography, Theme, Snackbar, useMediaQuery } from '@material-ui/core'
import { getGraphQLFilter } from '@onextech/gvs-kit/utils'
import { S3Image } from '@onextech/gvs-kit/core'
import Router from 'next/router'
import partition from 'lodash/partition'
import sortBy from 'lodash/sortBy'
import Swiper from '../../../components/Swiper'
import IntroCard from './IntroCard'
import ProductInfo from './ProductInfo'
import { useListProducts } from '../../../graphql/product'
import { useCurrentCart } from '../../../graphql/cart'
import { VariantInterface } from '../../../graphql/variant'
import Button from '../../../components/Button'
import { useAuth } from '../../../auth'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0, 4),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 12, 0),
    },
  },
  recommendedProductTitle: {
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(10, 0, 4),
    },
    margin: theme.spacing(5, 0),
    textAlign: 'center',
  },
  productInfoTitle: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(10),
    },
    marginTop: theme.spacing(7),
    textAlign: 'center',
  },
  productInfoSubtitle: {
    color: theme.palette.secondary.light,
    fontWeight: 400,
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(3, 0, 9),
    },
    textAlign: 'center',
  },
  disclaimerText: {
    color: theme.palette.text.light,
    textAlign: 'center',
    margin: `${theme.spacing(6)}px auto 0`,
    [theme.breakpoints.up('md')]: {
      maxWidth: 600,
      margin: `${theme.spacing(8)}px auto 0`,
    },
  },
  galleryImage: {
    height: '100%',
    width: '100%',
    maxHeight: 450,
    minHeight: 350,
    objectFit: 'contain',
  },
  galleryProductTitle: {
    fontSize: theme.typography.pxToRem(20),
  },
  galleryProductDescription: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(16),
  },
}))

const QuizResultsUI = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'))

  const { user, outcome, additionalProducts } = props
  const { openLoginModal } = useAuth()

  // Fetch Outcome's products
  const outcomeProductIds = additionalProducts.concat(outcome?.products?.map(({ id }) => id) ?? [])
  const recommendedProductIDs = outcome?.recommendedProducts?.map(({ id }) => id) ?? []
  const filter = {
    productIDs: [...outcomeProductIds, ...recommendedProductIDs],
  }
  const nextFilter = getGraphQLFilter({ productIDs: { op: 'eq', key: 'id' } })(filter)
  const { products: queriedProducts, loading } = useListProducts({ variables: { filter: nextFilter } })

  // Group products and recommendedProducts
  const [products = [], recommendedProducts = []] = useMemo(() => {
    return partition(queriedProducts, ({ id }) => outcomeProductIds.includes(id))
  }, [loading, queriedProducts])

  const groupedProducts = sortBy(products, 'category.title')

  // Manage Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const handleSnackbarClose = () => setOpenSnackbar(false)

  // Manage Modal state
  const [modalProduct, setModalProduct] = useState(null)

  const handleClickOpen = (product) => {
    setModalProduct(product)
  }

  const handleModalClose = () => {
    setModalProduct(null)
  }

  // Handle Cart
  const { handleCreateCartItem } = useCurrentCart()

  const handleAddToCart = (variant: VariantInterface, quantity: number) => {
    if (!user?.id) {
      handleModalClose()
      return openLoginModal()
    }
    handleCreateCartItem({
      quantity,
      userID: user?.id,
      variantID: variant?.id,
    })
    handleModalClose()
    setOpenSnackbar(true)
  }

  // listProducts loading
  if (loading) return null

  const gallerySwiperParams = {
    spaceBetween: 30,
    keyboard: true,
    slidesPerView: isSmallScreen ? 1 : 4,
    grabCursor: true,
  }

  const galleryProducts = recommendedProducts.map((product) => (
    <Box key={product.id} onClick={() => handleClickOpen(product)}>
      <S3Image src={product.media?.[0]?.src} className={classes.galleryImage} />
      <Typography variant="h6" className={classes.galleryProductTitle}>
        {product.title}
      </Typography>
      <Typography variant="body1" className={classes.galleryProductDescription}>
        {product.desc}
      </Typography>
    </Box>
  ))

  return (
    // FIXME: Brand logo not showing in navbar of quiz individual pages
    <Box className={classes.root}>
      <IntroCard outcome={outcome} user={user} />

      {/* TODO: Add Suan kai's component here */}
      <Typography variant="h3" className={classes.productInfoTitle}>
        Your Customised Skincare Routine
      </Typography>
      <Typography variant="h6" className={classes.productInfoSubtitle}>
        {`${groupedProducts?.length} Products, 1 Revolutionary Skincare`}
      </Typography>
      {Boolean(groupedProducts?.length) &&
        groupedProducts.map((product) => <ProductInfo product={product} handleAddToCart={handleAddToCart} />)}

      {/* Recommended Products */}
      <Typography variant="h3" className={classes.recommendedProductTitle}>
        More Recommended Products
      </Typography>
      <Swiper {...gallerySwiperParams}>{galleryProducts}</Swiper>
      <Typography variant="body2" className={classes.disclaimerText}>
        *Please note that the recommended skin products are based on your quiz answers. If you are currently
        experiencing any skin irritation from the products, please stop using the product immediately and consult your
        doctor.
      </Typography>

      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        open={openSnackbar}
        message="Added To Cart"
        action={
          <Button
            color="secondary"
            size="small"
            onClick={() => {
              handleSnackbarClose()
              Router.push('/cart')
            }}
          >
            Go to Cart
          </Button>
        }
      />
    </Box>
  )
}

export default QuizResultsUI
