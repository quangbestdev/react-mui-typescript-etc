import React from 'react'
import { Box, Hidden, Theme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SkinQuizLayout from './SkinQuizLayout'

const useStyles = makeStyles((theme: Theme) => ({
  block: {
    [theme.breakpoints.up('lg')]: {
      backgroundImage: `url(
        '/quiz/cosmetic-bottle-with-pipette-on-white-background.png'
      )`,
      backgroundPosition: 'right bottom 8px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '230px auto',
      position: 'fixed',
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
  },
  header: {
    marginTop: theme.spacing(20),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 0),
    },
  },
  subHeaderWrapper: {
    margin: `${theme.spacing(2.5)}px auto 0`,
  },
  subHeader: {
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(5.5),
  },
  image: {
    [theme.breakpoints.only('xs')]: {
      height: 250,
      marginTop: theme.spacing(4),
    },
    [theme.breakpoints.down('md')]: {
      height: 500,
      marginTop: theme.spacing(4),
    },
  },
  disclaimerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      bottom: 32,
    },
  },
  disclaimer: {
    color: theme.palette.text.light,
    maxWidth: 808,
  },
}))

const SkinQuizIntro = (props) => {
  const { next } = props
  const classes = useStyles(props)

  return (
    <SkinQuizLayout className={classes.block}>
      <Typography variant="h3" className={classes.header}>
        Welcome to Your Customised Skincare Regime
      </Typography>
      <Box maxWidth={720} className={classes.subHeaderWrapper}>
        <Typography variant="h5" className={classes.subHeader}>
          Tell us about yourself and we’ll create a skincare regime with best products in the market specially for you.
        </Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={next}>
        Start Skin Quiz
      </Button>
      {/* Dropper Image */}
      <Hidden lgUp>
        <Box>
          <img
            src="/quiz/cosmetic-bottle-with-pipette-on-white-background.png"
            alt="cosmetic bottle"
            className={classes.image}
          />
        </Box>
      </Hidden>

      {/* Disclaimer */}
      <Box className={classes.disclaimerWrapper}>
        <Typography variant="body2" className={classes.disclaimer}>
          By using this quiz, you agree to its terms and that we will not be liable for any harm resulting from
          your use.
        </Typography>
        <Typography variant="body2" className={classes.disclaimer}>
          Recommendations provided by this quiz do not constitute medical advice and should not be used to diagnose or
          treat skin conditions.
        </Typography>
      </Box>
    </SkinQuizLayout>
  )
}

export default SkinQuizIntro
