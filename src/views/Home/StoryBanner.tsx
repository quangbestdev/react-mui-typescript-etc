import React from 'react'
import Link from 'next/link'
import { Box, Button, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.up('md')]: {
      maxHeight: 520,
    },
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4, 4, 0),
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-start',
      padding: theme.spacing(4, 0, 4, 4),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(9, 0, 9, 8),
    },
  },
  title: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 250,
    },
  },
  description: {
    margin: theme.spacing(2.5, 0, 4),
    maxWidth: 440,
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  button: {
    padding: theme.spacing(1, 5),
  },
}))
const StoryBanner: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid className={classes.root} container>
      <Grid item xs={12} sm={4} md={6}>
        <img className={classes.image} src="/home/cocoa_field_woman.jpg" alt="woman-farmer" />
      </Grid>
      <Grid item xs={12} sm={8} md={6} className={classes.contentWrapper}>
        {/* Title */}
        <Typography className={classes.title} variant="h3">
          The Ethicoa Difference
        </Typography>
        {/* Content */}
        <Typography className={classes.description} variant="body1">
          Benns Ethicoa is about quality and fairness. We started our humble beginnings in 1973 and have since come a
          long way. Our model allows us to cut the middle man out and directly work with the farmers in various origins.
        </Typography>
        <Link href="/about" passHref>
          <Button className={classes.button} variant="contained" color="primary">
            Learn More
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default StoryBanner
