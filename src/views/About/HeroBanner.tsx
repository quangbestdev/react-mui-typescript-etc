import React from 'react'
import { Theme, Typography, Box, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  heroContentWrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(6, 0, 5),
  },
  heroTitle: {
    color: theme.palette.text.primary,
    margin: theme.spacing(4, 0),
    textAlign: 'center',
  },
  heroBody: {
    color: theme.palette.text.primary,
    textAlign: 'center',
  },
  // REFERENCE: https://www.w3schools.com/howto/howto_css_responsive_iframes.asp
  iframeWrapper: {
    position: 'relative',
    paddingTop: '56.25%',
    overflow: 'hidden',
    width: '100%',
    '& > iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%',
    },
  },
}))

const HeroBanner: React.FC = () => {
  const classes = useStyles()

  return (
    <Box className={classes.heroContentWrapper}>
      <Container maxWidth="md">
        <Box className={classes.iframeWrapper}>
          <iframe
            title="about-video"
            src="https://www.youtube.com/embed/G85PgKKB1zc"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </Box>
      </Container>
      <Container maxWidth="md">
        <Typography variant="h1" className={classes.heroTitle}>
          How it all began
        </Typography>
        <Typography variant="subtitle1" className={classes.heroBody}>
          Benns Ethicoa (wordplay of Ethical Cocoa) was founded in a move towards a more sustainable and natural method
          of producing chocolate. We started our humble beginnings in 1973 and have since come a long way. Our model
          allows us to cut the middleman out and directly work with the farmers in various origins.
        </Typography>
      </Container>
    </Box>
  )
}

export default HeroBanner
