import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Theme,
  useMediaQuery,
  Drawer,
  Breadcrumbs,
  NativeSelect,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { getGraphQLFilter, getFilterChips } from '@onextech/gvs-kit/utils'
import { useFilters } from '@onextech/gvs-kit/hooks'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout/Layout'
import ProductsFilterForm from './ProductsFilterForm'
import ProductCard from './ProductCard'
import { useListProducts } from '../../graphql/product'
import { useListCategories } from '../../graphql/category'

const useStyles = makeStyles((theme: Theme) => ({
  listingsWrapper: {
    backgroundColor: theme.palette.background.primary,
    paddingBottom: 150,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(8),
    },
  },
  banner: {
    width: '100%',
  },
  breadcrumbsWrapper: {
    marginTop: theme.spacing(4),
    '& a': {
      color: theme.palette.text.primary,
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(16),
      textDecoration: 'none',
    },
    '& .MuiBreadcrumbs-separator': {
      color: theme.palette.text.hint,
    },
  },
  bodyWrapper: {
    marginTop: theme.spacing(4),
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(6, 0),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(3, 0),
    },
  },
  showFilterButton: {
    borderRadius: 0,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.text.primary}`,
    padding: theme.spacing(1.5, 7),
  },
  productsWrapper: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(3),
    },
  },
  productsInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2, 4),
    borderRadius: 10,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      padding: theme.spacing(2),
    },
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(16),
  },
  sectionCount: {
    fontSize: theme.typography.pxToRem(16),
    marginLeft: theme.spacing(2),
    color: theme.palette.text.hint,
  },
  drawerPaper: {
    width: 300,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: 400,
      padding: theme.spacing(4),
    },
  },
  recentsWrapper: {
    backgroundColor: theme.palette.common.white,
    textAlign: 'center',
    padding: theme.spacing(8, 0, 9),
  },
  recentlyViewedTitle: {
    marginBottom: theme.spacing(4),
  },
  breadcrumbButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(16),
  },
}))

const productFilterFields = {
  merchants: { op: 'eq', key: 'id', filterKey: 'merchantID' },
  categories: { op: 'eq', key: 'id', filterKey: 'categoryID' },
}

const Shop: React.FC = (props) => {
  const classes = useStyles(props)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { categories } = useListCategories()
  const router = useRouter()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  // Filters
  const [filters, addFilter, removeFilter] = useFilters()
  const filter = getGraphQLFilter(productFilterFields)(filters)

  // Default filter applied when redirected from Homepage
  useEffect(() => {
    const featuredCategory = categories.filter((item) => item.title === router.query.category)
    addFilter({ categories: featuredCategory })
  }, [categories])

  // Chips
  const filterChips = getFilterChips(filters)

  const handleRemoveCategoryFilter = () => {
    removeFilter({ key: 'categories' })
  }

  const getCategoryFilterLabel = (filterChips) => {
    return filterChips?.find((filterChip) => filterChip.key === 'categories')?.label
  }

  // TODO: Incorporate loading, error, and refetch from useListProducts hook if need be
  const { products } = useListProducts({ variables: { filter } })

  return (
    <Layout title="Shop">
      <Box className={classes.listingsWrapper}>
        {/* Banner Image */}
        <img className={classes.banner} src="/products/products-banner.png" alt="Shop Banner" />
        <Container>
          {/* Breadcrumbs Section */}
          <Breadcrumbs className={classes.breadcrumbsWrapper} separator={<NavigateNextIcon fontSize="small" />}>
            <Button className={classes.breadcrumbButton} disableRipple>
              Home
            </Button>
            <Button onClick={handleRemoveCategoryFilter} className={classes.breadcrumbButton} disableRipple>
              All Categories
            </Button>
            {Boolean(getCategoryFilterLabel(filterChips)) && (
              <Button className={classes.breadcrumbButton} disableRipple>
                {getCategoryFilterLabel(filterChips)}
              </Button>
            )}
          </Breadcrumbs>
          <Grid container className={classes.bodyWrapper}>
            {/* Filter Section */}
            <Grid item xs={12} md={3}>
              {isSmallScreen ? (
                <Box className={classes.buttonWrapper}>
                  <Button className={classes.showFilterButton} onClick={toggleDrawer}>
                    Show Filters
                  </Button>
                </Box>
              ) : (
                <ProductsFilterForm filters={filters} addFilter={addFilter} />
              )}
            </Grid>
            {/* Product Cards Section */}
            <Grid item xs={12} md={9} className={classes.productsWrapper}>
              <Box className={classes.productsInfo}>
                <Box display="flex">
                  <Typography className={classes.sectionTitle}>
                    {getCategoryFilterLabel(filterChips) ?? 'All Categories'}
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          {/* Drawer - for screen sizes SM and below */}
          <Drawer
            open={isDrawerOpen}
            anchor="left"
            onClose={toggleDrawer}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <ProductsFilterForm filters={filters} addFilter={addFilter} />
          </Drawer>
        </Container>
      </Box>
      {/* Recently Viewed Section */}
      <Box className={classes.recentsWrapper}>
        <Container>
          <Typography className={classes.recentlyViewedTitle} variant="h5">
            Your May Also Like
          </Typography>
          <Grid container spacing={3}>
            {products.slice(0, 4).map((product) => (
              <Grid item xs={12} sm={6} md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}

export default Shop
