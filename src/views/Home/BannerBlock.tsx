import React from 'react'
import { Box, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(7),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(13),
    },
  },
}))

const BannerBlock: React.FC = (props) => {
  const { children, ...rest } = props
  const classes = useStyles(props)

  return (
    <Box className={classes.root} {...rest}>
      {children}
    </Box>
  )
}

export default BannerBlock
