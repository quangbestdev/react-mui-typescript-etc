import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import kebabCase from 'lodash/kebabCase'
import MenuIcon from '@material-ui/icons/Menu'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import PersonIcon from '@material-ui/icons/Person'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import NavLink from './NavLink'
import NavDrawer from './NavDrawer'
import LoginSignupModal from '../LoginSignupModal'
import { useAuth } from '../../auth'
import { useCurrentCart } from '../../graphql/cart'
import { routes } from '../../routes'

interface NavBarProps {
  onBackBtnClick?: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.dark,
    position: 'static',
    top: 0,
  },
  toolBar: {
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
  },
  mobileNavWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
  },
  locationBarWrapper: {
    minHeight: 35,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
  },
  locationBarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& > :nth-child(1)': {
      marginRight: theme.spacing(0.5),
    },
    '& > .MuiTypography-root': {
      fontFamily: theme.typography.fontFamily,
    },
  },
  navBarContainer: {
    alignItems: 'center',
    padding: theme.spacing(1, 0),
  },
  navBarLinksWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > a': {
      textDecoration: 'none',
    },
    '& > :not(:first-child)': {
      marginLeft: theme.spacing(4),
    },
  },
  navBarLink: {
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
  },
  iconBarLinksWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.up('md')]: {
      '& > :not(:first-child)': {
        marginLeft: theme.spacing(1),
      },
    },
  },
  loginButton: {
    padding: theme.spacing(1),
  },
  menuWrapper: {
    '& .MuiPaper-root': {
      borderRadius: 4,
    },
    '& .MuiMenuItem-root': {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  cartButton: {
    padding: theme.spacing(0.5, 3),
    '& > span > .MuiButton-startIcon': {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      border: 'none',
      justifyContent: 'flex-end',
      '& .MuiTypography-root': {
        display: 'none',
      },
    },
  },
  cartLabel: {
    fontWeight: 800,
  },
  logoWrapper: {
    height: 40,
    textDecoration: 'none',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      textAlign: 'center',
    },
  },
  logo: {
    height: '100%',
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      height: 40,
      padding: theme.spacing(0, 1.5),
    },
  },
  hamburgerButtonWrapper: {
    marginTop: theme.spacing(1.25),
  },
  closeButton: {
    padding: theme.spacing(1.5, 0),
  },
  secondaryHamburgerLink: {
    color: theme.palette.primary.main,
  },
  hiddenSmDown: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  hiddenMdUp: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge)

const LogoutNavLink = ({ label, className, ...rest }) => {
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <LoginSignupModal
      toggle={() => (
        <Button onClick={handleSignOut}>
          <Typography variant="body2" className={className}>
            {label}
          </Typography>
        </Button>
      )}
      {...rest}
    />
  )
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const { cartItems } = useCurrentCart()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const classes = useStyles()

  const navLinks = [
    {
      label: 'Shop',
      render: (
        <Link href="/shop" passHref>
          <Typography className={classes.navBarLink} variant="button" component="a">
            Shop
          </Typography>
        </Link>
      ),
    },
    {
      label: 'Gifts',
      render: (
        <Link href="/shop" passHref>
          <Typography className={classes.navBarLink} variant="button" component="a">
            Gifts
          </Typography>
        </Link>
      ),
    },
    {
      label: 'Visit The Factory',
      render: (
        <Link href="https://bennsethicoa.my/visit" passHref>
          <Typography className={classes.navBarLink} variant="button" component="a">
            Visit The Factory
          </Typography>
        </Link>
      ),
    },
    {
      label: 'About',
      render: (
        <Link href="/about" passHref>
          <Typography className={classes.navBarLink} variant="button" component="a">
            Our Story
          </Typography>
        </Link>
      ),
    },
  ]

  const iconLinks = [
    {
      label: 'Cart',
      render: (
        <Link href="/cart" passHref>
          <Button
            startIcon={
              <StyledBadge
                badgeContent={cartItems?.reduce((acc, { quantity }) => acc + quantity, 0) || 0}
                showZero
                color="primary"
              >
                <ShoppingCartIcon color="secondary" />
              </StyledBadge>
            }
            variant="outlined"
            color="primary"
            className={classes.cartButton}
          >
            <Typography className={classes.cartLabel} variant="subtitle2">
              Cart
            </Typography>
          </Button>
        </Link>
      ),
    },
    {
      label: 'Log In',
      render: (
        <>
          {user ? (
            <>
              <IconButton className={classes.loginButton} onClick={handleOpenMenu}>
                <PersonIcon color="secondary" />
              </IconButton>
              <Menu
                id="user-icon-menu"
                className={classes.menuWrapper}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                transformOrigin={{
                  vertical: -45,
                  horizontal: 0,
                }}
              >
                <Link href="/orders" passHref>
                  <MenuItem>Orders</MenuItem>
                </Link>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <IconButton className={classes.loginButton}>
                  <PersonIcon color="secondary" />
                </IconButton>
              </Link>
            </>
          )}
        </>
      ),
    },
  ]

  const hamburgerNavLinks = [
    {
      label: 'Close',
      render: (
        <IconButton className={classes.closeButton} color="primary" onClick={toggleDrawer} aria-label="close drawer">
          <CloseIcon fontSize="large" />
        </IconButton>
      ),
    },
    {
      label: 'Home',
      render: (
        <div className={classes.hamburgerButtonWrapper}>
          <Link href="/" passHref>
            <Button variant="text">
              <Typography variant="h3">Home</Typography>
            </Button>
          </Link>
        </div>
      ),
    },
    {
      label: 'Shop',
      render: (
        <Link href="/shop" passHref>
          <Button variant="text">
            <Typography variant="h3">Shop</Typography>
          </Button>
        </Link>
      ),
    },
    {
      label: 'Gifts',
      render: (
        <Link href="/shop" passHref>
          <Button variant="text">
            <Typography variant="h3">Gifts</Typography>
          </Button>
        </Link>
      ),
    },
    {
      label: 'Visit The Factory',
      render: (
        <div className={classes.hamburgerButtonWrapper}>
          <Link href="https://bennsethicoa.my/visit" passHref>
            <Button variant="text">
              <Typography variant="h3">Visit The Factory</Typography>
            </Button>
          </Link>
        </div>
      ),
    },
    {
      label: 'Our Story',
      render: (
        <div className={classes.hamburgerButtonWrapper}>
          <Link href="/about" passHref>
            <Button variant="text">
              <Typography variant="h3">Our Story</Typography>
            </Button>
          </Link>
        </div>
      ),
    },
    user
      ? {
          label: 'Sign Out',
          render: (
            <div className={classes.hamburgerButtonWrapper}>
              <Button variant="text">
                <LogoutNavLink label="Sign Out" className={classes.secondaryHamburgerLink} />
              </Button>
            </div>
          ),
        }
      : {
          label: 'Log In',
          render: (
            <div className={classes.hamburgerButtonWrapper}>
              <Link href="/login" passHref>
                <Button variant="text">
                  <Typography variant="h4" className={classes.secondaryHamburgerLink}>
                    Log In
                  </Typography>
                </Button>
              </Link>
            </div>
          ),
        },
  ]

  // Filter out My Orders link if user is not logged in
  const nextHamburgerNavLinks = user
    ? hamburgerNavLinks
    : hamburgerNavLinks.filter((link) => link.label !== 'My Orders')

  const renderNavLink = (navLink) => {
    const { url, render, ...rest } = navLink
    return url ? <NavLink {...rest} url={url} key={navLink.url} /> : render
  }
  return (
    <AppBar elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolBar} disableGutters>
        <Box className={classes.root}>
          {/* Nav Links @ SM and below */}
          <Box className={classes.hiddenMdUp}>
            <Grid container className={classes.mobileNavWrapper}>
              <Grid item xs={4}>
                <IconButton color="inherit" onClick={toggleDrawer} aria-label="open drawer" size="medium">
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs={4} className={classes.logoWrapper}>
                <Link href="/" passHref>
                  <img className={classes.logo} src="/logo.png" alt="logo" />
                </Link>
              </Grid>
              <Grid item xs={4} className={classes.iconBarLinksWrapper}>
                {iconLinks.map((navLink, i) => {
                  return <React.Fragment key={kebabCase(navLink.label)}>{renderNavLink(navLink)}</React.Fragment>
                })}
              </Grid>
            </Grid>
          </Box>

          {/* Nav Links @ MD and above */}
          <Box className={classes.hiddenSmDown}>
            {/* Red Location Bar */}
            <Box className={classes.locationBarWrapper}>
              <Container className={classes.locationBarContainer}>
                <LocationOnOutlinedIcon fontSize="small" color="secondary" />
                <Typography variant="caption">Singapore</Typography>
              </Container>
            </Box>

            <Container>
              <Grid className={classes.navBarContainer} container>
                {/* Logo */}
                <Grid item md={3}>
                  <Link href="/" passHref>
                    <Box className={classes.logoWrapper} component="a">
                      <img className={classes.logo} src="/logo.png" alt="logo" />
                    </Box>
                  </Link>
                </Grid>
                {/* Page Links */}
                <Grid item md={6} className={classes.navBarLinksWrapper}>
                  {navLinks.map((navLink, i) => {
                    return <React.Fragment key={kebabCase(navLink.label)}>{renderNavLink(navLink)}</React.Fragment>
                  })}
                </Grid>
                {/* Icon Buttons */}
                <Grid item md={3} className={classes.iconBarLinksWrapper}>
                  {iconLinks.map((navLink, i) => {
                    return <React.Fragment key={kebabCase(navLink.label)}>{renderNavLink(navLink)}</React.Fragment>
                  })}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
        {/* Nav Drawer */}
        <NavDrawer open={isDrawerOpen} onClose={toggleDrawer} links={nextHamburgerNavLinks} />
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
