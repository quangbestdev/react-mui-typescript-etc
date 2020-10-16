import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Helmet } from 'react-helmet'
import { Box, Hidden } from '@material-ui/core'
import clsx from 'clsx'
import NavBar from './NavBar'
import Footer from './Footer'
import Hero from '../Hero'
import BackButton from './BackButton'
import CookieBar from './CookieBar'

interface LayoutProps {
  className?: string
  title: string
  onBackBtnClick?: () => void
  navBar?: React.ComponentProps<typeof NavBar>
  footer?: React.ComponentProps<typeof Footer>
  hero?: React.ComponentProps<typeof Hero>
  verticalHero?: React.ComponentProps<typeof Hero>
  showFooter?: boolean
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  main: {
    flex: 1,
    // ensures that footer is always at bottom of page @link: https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook/Sticky_footers
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
    '& > main': {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'stretch',
      flexDirection: 'column',
    },
  },
  verticalHero: {
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      width: '100%',
      top: 0,
      zIndex: -1,
    },
    [theme.breakpoints.up('md')]: {
      height: 'auto',
      flex: 0.6,
    },
    [theme.breakpoints.up('lg')]: {
      flex: 0.5,
    },
    [theme.breakpoints.up('xl')]: {
      flex: 0.4,
    },
  },
  hero: {
    minHeight: 'auto',
    maxHeight: 126,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      maxHeight: 316,
      alignItems: 'initial',
      '& > .MuiContainer-root': {
        marginTop: theme.spacing(9),
      },
    },
    '& > .MuiContainer-root > .MuiBox-root': {
      display: 'flex',
      justifyContent: 'space-between',
      '& > *': {
        // Ensure that hero's content is always in the center
        flex: '1 1 0',
      },
    },
  },
  heroContent: {
    // Ensure that hero's content is always in the center
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&&&': {
      flex: '5 1 0', // Give hero content more width
    },
  },
  cookieBar: {
    position: 'sticky',
    bottom: 0,
  },
}))

const Layout: React.FC<LayoutProps> = (props) => {
  const { className, title, onBackBtnClick, navBar, footer, hero, verticalHero, children, showFooter = true } = props
  const classes = useStyles()

  const hasHero = Boolean(onBackBtnClick || hero)
  const { children: heroContent = null, ...heroProps } = hero || {}

  return (
    <Box>
      <div className={clsx(classes.root, className)}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {verticalHero && <Hero className={classes.verticalHero} {...verticalHero} />}
        <Box className={classes.main}>
          <NavBar onBackBtnClick={onBackBtnClick} {...navBar} />
          {hasHero && (
            <Hero className={classes.hero} {...heroProps}>
              <Box>
                {onBackBtnClick && (
                  <Hidden smDown>
                    <BackButton onClick={onBackBtnClick} color="white" />
                  </Hidden>
                )}
              </Box>
              <Box className={classes.heroContent}>{heroContent}</Box>
              <div>{/* Spacer to make sure that hero content will be in the center */}</div>
            </Hero>
          )}
          <main>{children}</main>
          {showFooter && <Footer {...footer} />}
        </Box>
      </div>
    </Box>
  )
}

export default Layout
