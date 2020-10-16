import React from 'react'
import Link from 'next/link'
import { Box, Container, Grid, Typography, Theme } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(8, 0),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      margin: theme.spacing(8, 0, 4),
    },
  },
  contentWrapper: {
    borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
    backgroundColor: theme.palette.background.tertiary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.only('sm')]: {
      padding: theme.spacing(4, 0),
    },
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(4, 2),
      borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
    },
  },
  title: {
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  content: {
    lineHeight: 1.4,
    color: theme.palette.text.secondary,
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  imageWrapper: {
    display: 'flex',
  },
  image: {
    borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,
    maxWidth: '100%',
    objectFit: 'cover',
    [theme.breakpoints.only('xs')]: {
      borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
    },
  },
  linkWrapper: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    marginTop: theme.spacing(3),
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center',
    },
  },
  link: {
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
  },
}))

const RevitalizeBanner: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root}>
      <Grid className={classes.imageWrapper} item xs={12} sm={4} md={6}>
        <img className={classes.image} src="/products/woman-farmer.jpg" alt="woman-farmer" />
      </Grid>
      <Grid className={classes.contentWrapper} item xs={12} sm={8} md={6}>
        <Container maxWidth="xs">
          {/* Title */}
          <Typography className={classes.title} variant="h3">
            Revitalizing the Asian cacao industry
          </Typography>
          {/* Content */}
          <Typography className={classes.content} variant="subtitle1">
            Cacao production in Asia has been falling over the past 20 years, because hardworking farmers just aren’t
            paid enough to grow cacao. Benns Ethioca works directly with farmers, cutting out the middleman, so our
            farmers earn up to 3x market rate.
          </Typography>
          <Link href="/about" passHref>
            <Box component="a" className={classes.linkWrapper}>
              <Typography variant="button" className={classes.link}>
                Learn More
              </Typography>
              <ChevronRightIcon color="primary" />
            </Box>
          </Link>
        </Container>
      </Grid>
    </Grid>
  )
}

export default RevitalizeBanner
