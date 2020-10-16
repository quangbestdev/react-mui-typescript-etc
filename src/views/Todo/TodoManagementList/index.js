import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'red',
    color: theme.palette.error.main,
  },
  title: {
    fontSize: 24,
  },
  content: {
    marginTop: theme.spacing(5), // 40px
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(1), // 8px
    },
  },
}))

const Helloworld = (props) => {
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Hi</h1>
      <div className={classes.content}>Block</div>
    </div>
  )
}

export default Helloworld
