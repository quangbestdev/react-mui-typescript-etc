import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Link } from '@material-ui/core'
import RouterLink from 'next/link'

const useStyles = makeStyles(() => ({
  root: {},
}))

function Header(props) {
  const { todo, className, ...rest } = props
  const classes = useStyles()

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <RouterLink href="/management/todos" passHref>
        <Link component="a">
          <Typography component="h2" gutterBottom variant="overline">
            Todos
          </Typography>
        </Link>
      </RouterLink>
      <Typography component="h1" variant="h3">
        {todo.name}
      </Typography>
    </div>
  )
}

export default Header
