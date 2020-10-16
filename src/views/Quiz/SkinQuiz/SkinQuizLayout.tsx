import React from 'react'
import { Box, Container, Theme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Block from '../../../components/Block'

const useStyles = makeStyles((theme: Theme) => ({
  block: {
    height: '88vh',
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
}))

const SkinQuizLayout = (props) => {
  const { children, className } = props
  const classes = useStyles(props)

  return (
    <Block className={clsx(classes.block, className)}>
      <Container maxWidth="lg" className={classes.container}>
        {children}
      </Container>
    </Block>
  )
}

export default SkinQuizLayout
