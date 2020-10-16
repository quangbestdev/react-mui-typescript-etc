import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Button } from '@material-ui/core'
import TodoAddModal from './TodoAddModal'

const useStyles = makeStyles(() => ({
  root: {},
}))

function Header({ className, ...rest }) {
  const classes = useStyles()

  const [openAdd, setOpenAdd] = useState(false)

  const handleAddOpen = () => {
    setOpenAdd(true)
  }

  const handleAddClose = () => {
    setOpenAdd(false)
  }

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Management
          </Typography>
          <Typography component="h1" variant="h3">
            Todos
          </Typography>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" onClick={handleAddOpen}>
            Add Todo
          </Button>
        </Grid>
      </Grid>
      <TodoAddModal onClose={handleAddClose} open={openAdd} />
    </div>
  )
}

export default Header
