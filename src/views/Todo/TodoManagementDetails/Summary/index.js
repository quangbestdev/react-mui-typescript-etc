import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import TodoInfo from './TodoInfo'

const useStyles = makeStyles(() => ({
  root: {},
}))

function Summary(props) {
  const { todo, className, ...rest } = props
  const classes = useStyles()

  return (
    <Grid {...rest} className={clsx(classes.root, className)} container spacing={3}>
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <TodoInfo todo={todo} />
      </Grid>
    </Grid>
  )
}

export default Summary
