import React, { useState, useEffect } from 'react'
import RouterLink from 'next/link'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import { Card, CardActions, CardHeader, CardContent, List, Button, Divider } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import axios from '../../../utils/axios'
import GenericMoreButton from '../../../components/GenericMoreButton'
import TaskItem from './TaskItem'

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 400,
  },
  actions: {
    justifyContent: 'flex-end',
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1),
  },
}))

function TeamTasks({ className, ...rest }) {
  const classes = useStyles()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    let mounted = true

    const fetchTasks = () => {
      axios.get('/api/tasks').then((response) => {
        if (mounted) {
          setTasks(response.data.tasks)
        }
      })
    }

    fetchTasks()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader action={<GenericMoreButton />} title="Team Tasks" />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.inner}>
          <List>
            {tasks.map((task, i) => (
              <TaskItem divider={i < tasks.length - 1} key={task.id} task={task} />
            ))}
          </List>
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <RouterLink href="/kanban-board" passHref>
          <Button color="primary" component="a" size="small" variant="text">
            See all
            <ArrowForwardIcon className={classes.arrowForwardIcon} />
          </Button>
        </RouterLink>
      </CardActions>
    </Card>
  )
}

TeamTasks.propTypes = {
  className: PropTypes.string,
}

export default TeamTasks
