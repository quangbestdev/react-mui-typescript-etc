import React from 'react'
import RouterLink from 'next/link'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  root: {},
  addIcon: {
    marginRight: theme.spacing(1),
  },
}))

function Header({ className, ...rest }) {
  const classes = useStyles()

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Browse projects
          </Typography>
          <Typography component="h1" variant="h3">
            See the latest opportunities
          </Typography>
        </Grid>
        <Grid item>
          <RouterLink href="/projects/create" passHref>
            <Button color="primary" component="a" variant="contained">
              <AddIcon className={classes.addIcon} />
              Submit project
            </Button>
          </RouterLink>
        </Grid>
      </Grid>
    </div>
  )
}

Header.propTypes = {
  className: PropTypes.string,
}

export default Header
