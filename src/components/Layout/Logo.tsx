import React from 'react'
import RouterLink from 'next/link'
import { Link, Theme } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: 'none',
      cursor: 'pointer',
    },
  },
  image: {
    height: 115,
    [theme.breakpoints.down('xs')]: {
      height: 50,
    },
  },
}))

const Logo = () => {
  const classes = useStyles()

  return (
    <RouterLink href="/">
      <Link component="a" underline="none" className={classes.root}>
        <img src="/logo-black.png" alt="veritas-logo" className={classes.image} />
      </Link>
    </RouterLink>
  )
}

export default Logo
