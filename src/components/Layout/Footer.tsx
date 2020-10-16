import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Container, Grid, IconButton, Typography, Theme, Link } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk'
import MailIcon from '@material-ui/icons/Mail'
import NavLink from './NavLink'
import { useAuth } from '../../auth'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(7, 0),
    backgroundColor: theme.palette.background.dark,
    [theme.breakpoints.down('sm')]: {
      '& .MuiContainer-root': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
  },
  socialAndLinksContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      borderBottom: `1px solid ${theme.palette.text.light}`,
      paddingBottom: theme.spacing(2),
    },
  },
  socialMediaLinksWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  socialMediaIconWrapper: {
    border: `1px solid rgba(255, 255,255, 0.5)`,
    padding: theme.spacing(0.75),
    marginRight: theme.spacing(1.5),
  },
  socialMediaIcon: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.common.white,
  },
  pageLinksWrapper: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  pageLinkColumn: {
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(10),
    },
  },
  pageLinkWrapper: {
    marginBottom: theme.spacing(2),
    '& > a': {
      textDecoration: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  headerText: {
    fontSize: theme.typography.button.fontSize,
    fontWeight: 800,
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginTop: theme.spacing(4),
    },
  },
  bodyText: {
    fontSize: theme.typography.button.fontSize,
    opacity: 0.85,
    lineHeight: 1.3,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  contactDetailWrapper: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  contactIcon: {
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(1.5),
  },
  disclaimer: {
    fontSize: theme.typography.button.fontSize,
    opacity: 0.4,
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
}))

const Footer: React.FC = (props) => {
  const { user } = useAuth()
  const classes = useStyles()

  const navLinks = [
    { label: 'Shop', url: '/shop' },
    { label: 'Visit The Factory', url: 'https://bennsethicoa.my/visit' },
    { label: 'About Us', url: '/about' },
    { label: 'Contact Us', url: '/contact' },
    { label: 'Terms & Conditions', url: '/' },
    { label: 'Privacy Policy', url: '/' },
  ]

  // Filter out My Orders link if user is not logged in
  const nextNavLinks = user ? navLinks : navLinks.filter((link) => link.label !== 'My Orders')

  const renderNavLink = (navLink) => {
    const { url, render, ...rest } = navLink
    return url ? <NavLink {...rest} url={url} key={navLink.url} /> : render
  }

  return (
    <footer className={classes.root}>
      <Container maxWidth="md">
        <Grid container>
          {/* Social Media + Page Links */}
          <Grid item xs={12} md={8}>
            <Grid className={classes.socialAndLinksContainer} container>
              {/* Social Media Icons */}
              {/* TODO: Social Media Links */}
              <Grid className={classes.socialMediaLinksWrapper} item xs={12} md={4}>
                <Link component="a" href="https://www.facebook.com/bennschocolate/" target="_blank">
                  <IconButton className={classes.socialMediaIconWrapper}>
                    <FacebookIcon className={classes.socialMediaIcon} />
                  </IconButton>
                </Link>
                <Link component="a" href="https://www.instagram.com/bennsethicoa.sg/" target="_blank">
                  <IconButton className={classes.socialMediaIconWrapper}>
                    <InstagramIcon className={classes.socialMediaIcon} />
                  </IconButton>
                </Link>
              </Grid>
              {/* Page Links */}
              <Grid item xs={12} md={8}>
                <Typography className={classes.headerText} variant="body2">
                  Company
                </Typography>
                <Box className={classes.pageLinksWrapper}>
                  <Box className={classes.pageLinkColumn}>
                    {nextNavLinks.slice(0, 3).map((navBarLink) => {
                      return (
                        <Box className={classes.pageLinkWrapper} key={navBarLink.label}>
                          {renderNavLink(navBarLink)}
                        </Box>
                      )
                    })}
                  </Box>
                  <Box className={classes.pageLinkColumn}>
                    {nextNavLinks.slice(3).map((navBarLink) => {
                      return (
                        <Box className={classes.pageLinkWrapper} key={navBarLink.label}>
                          {renderNavLink(navBarLink)}
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/* Disclaimer */}
            <Typography variant="body2" className={classes.disclaimer}>
              © 2020 Benns Ethicoa
            </Typography>
          </Grid>

          {/* Contact Us */}
          <Grid item xs={12} md={4}>
            <Typography className={classes.headerText} variant="body2">
              Contact Us
            </Typography>
            <Box className={classes.contactDetailWrapper}>
              <PhoneInTalkIcon className={classes.contactIcon} />
              <Box>
                <Typography className={classes.bodyText} variant="body2">
                  SG 65-6553-7800
                </Typography>
                <Typography className={classes.bodyText} variant="body2">
                  MY 60 3-9076 5887
                </Typography>
              </Box>
            </Box>
            <Box className={classes.contactDetailWrapper}>
              <MailIcon className={classes.contactIcon} />
              <Typography className={classes.bodyText} variant="body2">
                hello@bennsethicoa.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer
