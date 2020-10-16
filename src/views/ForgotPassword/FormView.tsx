import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Typography } from '@material-ui/core'
import Block from '../../components/Block'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(6),
    '& > .MuiContainer-root': {
      padding: theme.spacing(3.5),
      borderRadius: 8,
      background: theme.palette.common.white,
    },
  },
  title: {
    marginBottom: theme.spacing(1.5),
    fontWeight: 600,
  },
}))

const FormView = ({ title, children }) => {
  const classes = useStyles()

  return (
    <Block container={{ maxWidth: 'xs' }} className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      {children}
    </Block>
  )
}

export default FormView
