import React, { useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  Container,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Snackbar,
  Typography,
  Theme,
} from '@material-ui/core'
import { Carousel, S3Image } from '@onextech/gvs-kit/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout/Layout'
import ProductForm from './ProductForm'
import RevitalizeBanner from './RevitalizeBanner'
import ProductCard from '../Shop/ProductCard'
import NextButton from '../../components/NextButton'
import PreviousButton from '../../components/PreviousButton'
import { useListProducts } from '../../graphql/product'
import { useCurrentCart } from '../../graphql/cart'
import { useAuth } from '../../auth'
import { VariantInterface } from '../../graphql/variant'
import { WysiwygView } from '../../components/Wysiwyg'
import Loading from '../../components/Loading'

const useStyles = makeStyles((theme: Theme) => ({
  pageContainer: {
    backgroundColor: theme.palette.background.default,
  },
  bodyWrapper: {
    backgroundColor: theme.palette.common.white,
  },
  imagesAndFormContainer: {
    marginTop: theme.spacing(7),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.only('xs')]: {
      paddingBottom: theme.spacing(2),
    },
  },
  detailsContainer: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.only('xs')]: {
      paddingBottom: theme.spacing(5),
    },
  },
  categoryText: {
    color: theme.palette.text.description,
    textTransform: 'uppercase',
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  title: {
    lineHeight: 1.2,
    marginBottom: theme.spacing(3),
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  carouselImageWrapper: {
    height: 105,
    width: 'auto',
    [theme.breakpoints.only('xs')]: {
      height: '20vw',
      width: '20vw',
    },
  },
  carouselImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  carouselButton: {
    color: theme.palette.secondary.main,
  },
  noImageWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    width: '100%',
    height: 500,
    objectFit: 'cover',
    [theme.breakpoints.only('xs')]: {
      height: 300,
    },
  },
  divider: {
    backgroundColor: theme.palette.primary.main,
  },
  descriptionWrapper: {
    padding: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(4),
    },
  },
  sectionHeader: {
    color: theme.palette.text.primary,
    fontWeight: 800,
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  contentsSectionWrapper: {
    marginTop: theme.spacing(6),
  },
  listWrapper: {
    color: theme.palette.text.primary,
  },
  listItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5),
  },
  listText: {
    display: 'inline',
    color: theme.palette.text.primary,
    lineHeight: 1.4,
  },
  disclaimer: {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    marginTop: theme.spacing(2),
  },
  expansionPanelRoot: {
    boxShadow: 'none',
    '&.Mui-expanded': {
      margin: 0,
    },
    '& > .MuiExpansionPanelSummary-root.Mui-expanded': {
      minHeight: 'unset',
    },
    '&:before': {
      display: 'none',
    },
  },
  expansionPanelSummary: {
    padding: theme.spacing(0, 3),
    '& > .MuiExpansionPanelSummary-content.Mui-expanded': {
      margin: 0,
    },
  },
  expansionPanelDetails: {
    flexDirection: 'column',
    padding: theme.spacing(1, 4, 3),
  },
  expansionPanelListTitle: {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  expansionPanelListDescription: {
    color: theme.palette.text.secondary,
  },
  recentlyViewedWrapper: {
    padding: theme.spacing(2, 0, 10),
  },
  recentlyViewedHeader: {
    color: theme.palette.text.tertiary,
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  addToCartSnackbar: {
    '& > .MuiSnackbarContent-root': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  goToCartButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.light,
    },
  },
}))

const Product: React.FC = (props) => {
  const classes = useStyles(props)
  const theme = useTheme()
  const router = useRouter()
  const { query } = router
  const { slug } = query

  const { loading, products } = useListProducts({
    variables: {
      filter: {
        slug: { eq: slug as string },
      },
    },
    skip: typeof slug !== 'string',
  })

  const product = products?.[0]
  const productCategory = product?.categoryID

  const { products: similarProducts } = useListProducts({
    variables: {
      filter: {
        categoryID: { eq: productCategory as string },
      },
    },
    skip: Boolean(productCategory) === false,
  })

  const [selectedImage, setSelectedImage] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const handleSnackbarClose = () => setOpenSnackbar(false)

  const getDetailsArray = (details) => {
    const cocoaPercent = details?.cocoaPercent ? `${details?.cocoaPercent}%` : null

    const detailsArray = [
      { title: 'Cocoa', content: cocoaPercent },

      { title: 'Weight', content: details?.weight },

      { title: 'Bean Type', content: details?.beanType },

      { title: 'Conche Time', content: details?.concheTime },

      {
        title: 'Dietary Requirements',
        content: details?.dietaryRequirements?.join(', '),
      },

      {
        title: 'Ingredients',
        content: details?.ingredients?.join(', '),
      },

      { title: 'Storage', content: details?.storage },
    ]

    return detailsArray.filter(({ content }) => content)
  }

  const { user, openLoginModal } = useAuth()
  const { cartItems, handleCreateCartItem, handleUpdateCartItem } = useCurrentCart()

  const handleAddToCart = async (variant: VariantInterface, quantity: number) => {
    if (!user?.id) return openLoginModal()

    const cartItem = cartItems.find(({ variantID }) => variantID === variant.id)
    const isInCart = Boolean(cartItem)

    await (isInCart
      ? handleUpdateCartItem({
          id: cartItem.id,
          quantity: cartItem.quantity + quantity,
        })
      : handleCreateCartItem({
          quantity,
          userID: user?.id,
          variantID: variant.id,
        }))

    setOpenSnackbar(true)
  }

  if (loading) {
    return <Loading />
  }

  const carouselProps = {
    swiping: true,
    heightMode: 'max' as 'max',
    slidesToScroll: 1,
    slidesToShow: 4,
    defaultControlsConfig: {
      pagingDotsStyle: {
        fill: theme.palette.secondary.main,
      },
    },
    renderCenterLeftControls: ({ previousSlide }) => (
      <PreviousButton className={classes.carouselButton} onClick={previousSlide} />
    ),
    renderCenterRightControls: ({ nextSlide }) => <NextButton className={classes.carouselButton} onClick={nextSlide} />,
  }

  return (
    <Layout title="Product" showFooter>
      <Container className={classes.pageContainer}>
        <Box className={classes.bodyWrapper}>
          {/* Images and Details */}
          <Grid className={classes.imagesAndFormContainer} container>
            {/* Product Images */}
            <Grid item xs={12} md={6}>
              {product?.media?.[0]?.src ? (
                <S3Image className={classes.mainImage} src={selectedImage || product?.media?.[0]?.src} alt="current" />
              ) : (
                <Box className={classes.noImageWrapper}>
                  <Typography>No Product Image</Typography>
                </Box>
              )}
              {/* TODO: Vertical carousel */}
              {product?.media?.length > 1 && (
                <Carousel {...carouselProps}>
                  {product?.media?.map((image) => (
                    <Box
                      key={image.src}
                      onClick={() => {
                        setSelectedImage(image.src)
                      }}
                      className={classes.carouselImageWrapper}
                    >
                      <S3Image className={classes.carouselImage} src={image.src} alt="product" />
                    </Box>
                  ))}
                </Carousel>
              )}
            </Grid>

            {/* Product Details */}
            <Grid className={classes.descriptionWrapper} item xs={12} md={6}>
              <Typography className={classes.categoryText} variant="button">
                {product?.category?.title}
              </Typography>
              <Typography className={classes.title} variant="h3">
                {product?.title}
              </Typography>
              {/* Product Form */}
              <ProductForm product={product} handleAddToCart={handleAddToCart} />
              {/* Contents */}
              {product?.features && (
                <Box className={classes.contentsSectionWrapper}>
                  <Typography className={classes.sectionHeader} variant="body1">
                    Includes
                  </Typography>
                  <ul className={classes.listWrapper}>
                    {product?.features?.map((feature) => {
                      return (
                        <Box key={feature} className={classes.listItemWrapper}>
                          <li>
                            <Typography className={classes.listText} variant="subtitle1">
                              {feature}
                            </Typography>
                          </li>
                        </Box>
                      )
                    })}
                  </ul>
                </Box>
              )}
            </Grid>
          </Grid>

          <Divider variant="middle" className={classes.divider} />

          {/* Details and Tasting Container */}
          <Grid className={classes.detailsContainer} container>
            {/* Product Details */}
            <Grid item xs={12} md={6}>
              <ExpansionPanel defaultExpanded className={classes.expansionPanelRoot}>
                <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.sectionHeader} variant="body2">
                    Details
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                  {getDetailsArray(product?.details).map((detail) => {
                    return (
                      <Grid container key={detail.title} className={classes.listItemWrapper}>
                        <Grid item xs={6}>
                          <Typography className={classes.expansionPanelListTitle} variant="subtitle1">
                            {detail.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography className={classes.expansionPanelListDescription} variant="subtitle1">
                            {detail.content}
                          </Typography>
                        </Grid>
                      </Grid>
                    )
                  })}
                  <Typography variant="subtitle1" className={classes.disclaimer}>
                    *Slight variations in each product may occur because all our chocolate is made by hand
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>

            {/* Tasting */}
            {product?.tasting && (
              <Grid item xs={12} md={6}>
                <ExpansionPanel defaultExpanded className={classes.expansionPanelRoot}>
                  <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.sectionHeader} variant="body2">
                      Tasting
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                    <WysiwygView content={product?.tasting} />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Banner */}
        <RevitalizeBanner />

        {/* Recently Viewed Items */}
        <Box className={classes.recentlyViewedWrapper}>
          <Typography variant="h5" className={classes.recentlyViewedHeader}>
            Your May Also Like
          </Typography>
          <Grid container spacing={3}>
            {similarProducts.slice(0, 4).map((product) => (
              <Grid item xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      {/* Add to Cart Snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={classes.addToCartSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        open={openSnackbar}
        message="Added To Cart"
        action={
          <Link href="/cart" passHref>
            <Button
              className={classes.goToCartButton}
              size="small"
              onClick={() => {
                handleSnackbarClose()
              }}
            >
              Go to Cart
            </Button>
          </Link>
        }
      />
    </Layout>
  )
}

export default Product
