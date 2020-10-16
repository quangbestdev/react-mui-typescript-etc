import React from 'react'
import { Container, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FeatureItem from './FeatureItem'
import { FACTORY_FEATURES } from './mocks'

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    color: theme.palette.text.tertiary,
    fontSize: theme.typography.pxToRem(40),
    marginRight: theme.spacing(12),
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      margin: theme.spacing(0, 4),
    },
  },
  img: {
    width: '100%',
    height: '100%',
  },
  gridContainer: {
    paddingTop: theme.spacing(1),
  },
  leftGrid: {
    order: 2,
    [theme.breakpoints.up('md')]: {
      order: 1,
    },
  },
  rightGrid: {
    order: 1,
    [theme.breakpoints.up('md')]: {
      order: 2,
    },
  },
}))

const FactoryFeatures = (props) => {
  const classes = useStyles(props)

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Left grid */}
        <Grid item xs={12} md={6} className={classes.leftGrid}>
          <Typography variant="h3" className={classes.heading}>
            A Delectable Chocolate Experience
          </Typography>

          <Grid container spacing={1} className={classes.gridContainer}>
            {FACTORY_FEATURES.map((feature) => (
              <Grid item xs={12} md={6} key={feature.id}>
                <FeatureItem title={feature.title} description={feature.description} image={feature.image} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right grid */}
        <Grid item xs={12} md={6} className={classes.rightGrid}>
          <img src="/visit/cocoa_beans_falling.jpg" className={classes.img} alt="cocoa beans falling" />
        </Grid>
      </Grid>
    </Container>
  )
}

export default FactoryFeatures
