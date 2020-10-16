import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Typography, Theme } from '@material-ui/core'
import Link from 'next/link'

interface NavLinkProps {
  label: string
  url: string
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    fontSize: theme.typography.button.fontSize,
    opacity: 0.85,
  },
}))

const NavLink: React.FC<NavLinkProps> = (props) => {
  const { label, url } = props
  const classes = useStyles()

  return (
    <Link href={url} passHref>
      <Typography className={classes.link} variant="body2" component="a">
        {label}
      </Typography>
    </Link>
  )
}

export default NavLink
