import React from 'react'
import { Grid, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ModelSortDirection, AdvertisementPlacementEnum } from '@onextech/etc-api'
import Layout from '../../components/Layout/Layout'
import CategoryCard from '../../components/CategoryCard'
import FeaturedCard from '../../components/FeaturedCard'
import NewArrivalCard from '../../components/NewArrivalCard'
import HomeBlock from './HomeBlock'
import BannerBlock from './BannerBlock'
import HeroBanner from './HeroBanner'
import FactoryVisitBanner from './FactoryVisitBanner'
import ShareTheLoveBanner from './ShareTheLoveBanner'
import StoryBanner from './StoryBanner'
import { useListProductsByPartitionCreatedAt } from '../../graphql/product'
import { CATEGORIES } from './mocks'
import useListAdvertisements from '../../graphql/advertisement/queries/useListAdvertisements'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.primary,
    '& .MuiBox-root header, footer': {
      margin: theme.spacing(0),
    },
  },
}))

const Home: React.FC = (props) => {
  const classes = useStyles(props)
  const NEW_ARRIVALS_LIMIT = 4

  // Gets products sorted by createdAt for New Arrivals
  const { products } = useListProductsByPartitionCreatedAt({
    variables: {
      limit: NEW_ARRIVALS_LIMIT,
    },
  })

  // Get advertisement banners and cards for feature
  const { advertisements } = useListAdvertisements()
  const homeHeroAdvertisement = advertisements.filter(
    ({ placement }) => placement === AdvertisementPlacementEnum.HOME_HERO
  )[0]
  const homeSquareLeftAdvertisement = advertisements.filter(
    ({ placement }) => placement === AdvertisementPlacementEnum.HOME_SQUARE_LEFT
  )[0]
  const homeSquareMiddleAdvertisement = advertisements.filter(
    ({ placement }) => placement === AdvertisementPlacementEnum.HOME_SQUARE_MIDDLE
  )[0]
  const homeSquareRightAdvertisement = advertisements.filter(
    ({ placement }) => placement === AdvertisementPlacementEnum.HOME_SQUARE_RIGHT
  )[0]
  const featuredItems = [homeSquareLeftAdvertisement, homeSquareMiddleAdvertisement, homeSquareRightAdvertisement]

  return (
    <Layout title="Home" className={classes.root}>
      {/* SECTION: Hero Banner */}
      <HeroBanner advertisement={homeHeroAdvertisement} />

      {/* SECTION: Story Banner */}
      <HomeBlock>
        <StoryBanner />
      </HomeBlock>

      {/* SECTION: Featured Items */}
      <HomeBlock title="Featured">
        <Grid container spacing={3}>
          {featuredItems.map((item, index) => (
            <Grid key={item?.title} item xs={12} sm={4}>
              <FeaturedCard
                image={item?.media[0].src}
                title={item?.title}
                link={item?.link}
                category={item?.category}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
      </HomeBlock>

      {/* SECTION: Visit The Factory Banner */}
      <BannerBlock>
        <FactoryVisitBanner />
      </BannerBlock>

      {/* SECTION: New Arrivals */}
      <HomeBlock title="New Arrival" viewAllLink="/shop">
        <Grid container spacing={3}>
          {products.map((item) => (
            <Grid item xs={12} sm={6} md={3}>
              <NewArrivalCard
                title={item.title}
                category={item.category.title}
                image={item.media?.[0].src}
                // TODO: Show price of first variant?
                price={item.variants?.items[0].price}
                slug={item.slug}
              />
            </Grid>
          ))}
        </Grid>
      </HomeBlock>

      {/* SECTION: Browse By Categories */}
      <HomeBlock title="Browse By">
        <Grid container spacing={3}>
          {CATEGORIES.map((category) => (
            <Grid item xs={12} sm={4}>
              <CategoryCard title={category.title} image={category.image} subcategories={category.subcategories} />
            </Grid>
          ))}
        </Grid>
      </HomeBlock>

      {/* SECTION: Bottom Banner */}
      <BannerBlock>
        <ShareTheLoveBanner />
      </BannerBlock>
    </Layout>
  )
}

export default Home
