import React from 'react'
import Link from 'next/link'
import { Box, Button, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 27),
    },
  },
  content: {
    padding: theme.spacing(3, 0, 1),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(4, 3),
    },
  },
  bannerMessage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      '& .MuiTypography-root': {
        textAlign: 'center',
      },
    },
  },
  title: {
    maxWidth: 250,
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      maxWidth: 450,
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
    },
  },
  button: {
    padding: theme.spacing(1, 4),
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
    },
  },
}))

const ShareTheLoveBanner: React.FC = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Grid container className={classes.content}>
        <Grid item xs={12} md={9} className={classes.bannerMessage}>
          <Typography variant="h5" className={classes.title}>
            Send A Delicious Sweet Treat To Your Friends and Family
          </Typography>
          <Link href="/shop" passHref>
            <Button variant="contained" color="secondary" className={classes.button}>
              Share the Love
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={3}>
          <img src="/home/choc_gift_box.png" alt="gift-box" className={classes.image} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ShareTheLoveBanner
