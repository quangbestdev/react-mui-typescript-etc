import React from 'react'
import { Box, BoxProps, Container, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

interface AboutBlockProps extends BoxProps {
  title?: string
  className?: string
  container?: boolean
  isDarkBackground?: boolean
}

interface AboutBlockStyles {
  isDarkBackground?: boolean
}

const useStyles = makeStyles<Theme, AboutBlockStyles>((theme) => ({
  root: {
    backgroundColor: ({ isDarkBackground }) =>
      isDarkBackground ? theme.palette.background.tertiary : theme.palette.background.default,
    padding: theme.spacing(5, 4),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(10, 0),
    },
  },
}))

const AboutBlock: React.FC<AboutBlockProps> = (props) => {
  const { children, className, container = false, isDarkBackground = false, ...rest } = props
  const classes = useStyles({ isDarkBackground })

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      {container ? <Container maxWidth="lg">{children}</Container> : children}
    </Box>
  )
}

export default AboutBlock
