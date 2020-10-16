import React from 'react'
import { Box, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Carousel } from '@onextech/gvs-kit/core'
import InfoCard from './InfoCard'
import { INGREDIENT_INFO } from './const'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      maxWidth: 200,
    },
  },
  description: {
    maxWidth: 510,
    textAlign: 'center',
    marginBottom: theme.spacing(6),
  },
}))

const IngredientInfo: React.FC = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isSmScreen = useMediaQuery(theme.breakpoints.only('sm'))
  const isXsScreen = useMediaQuery(theme.breakpoints.only('xs'))

  const carouselParams = {
    swiping: true,
    wrapAround: true,
    heightMode: 'max' as 'max',
    slidesToShow: (isXsScreen && 1) || (isSmScreen && 2) || 4,
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Estates in Asia we source from
      </Typography>
      <Typography variant="body1" className={classes.description}>
        We source directly from an estate (a collection of farms within a small area) which allows us to have a direct
        beneficial impact to farmers.
      </Typography>
      <Carousel {...carouselParams}>
        {INGREDIENT_INFO.map((info) => (
          <InfoCard title={info.title} subtitle={info.subtitle} image={info.image} description={info.description} />
        ))}
      </Carousel>
    </Box>
  )
}

export default IngredientInfo
