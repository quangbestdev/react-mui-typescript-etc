import React, { useState, useEffect } from 'react'
import RouterLink from 'next/link'
import clsx from 'clsx'

import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import axios from '../../utils/axios'
import getInitials from '../../utils/getInitials'
import Label from '../../components/Label'
import GenericMoreButton from '../../components/GenericMoreButton'

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 900,
  },
  author: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  tags: {
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
  actions: {
    justifyContent: 'flex-end',
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1),
  },
}))

function LatestProjects({ className, ...rest }) {
  const classes = useStyles()
  const [projects, setProjects] = useState([])

  useEffect(() => {
    let mounted = true

    const fetchProjects = () => {
      axios.get('/api/dashboard/latest-projects').then((response) => {
        if (mounted) {
          setProjects(response.data.projects)
        }
      })
    }

    fetchProjects()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader action={<GenericMoreButton />} title="Latest projects" />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.inner}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Name
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow hover key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>
                    <div className={classes.author}>
                      <Avatar alt="Author" className={classes.avatar} src={project.author.avatar}>
                        {getInitials(project.author.name)}
                      </Avatar>
                      {project.author.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    {project.currency}
                    {project.price}
                  </TableCell>
                  <TableCell>
                    <div className={classes.tags}>
                      {project.tags.map((tag) => (
                        <Label color={tag.color} key={tag.text}>
                          {tag.text}
                        </Label>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <RouterLink href="/management/projects/1/overview" passHref>
                      <Button color="primary" component="a" size="small" variant="outlined">
                        View
                      </Button>
                    </RouterLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        <RouterLink href="/management/projects" passHref>
          <Button color="primary" component="a" size="small" variant="text">
            See all
            <ArrowForwardIcon className={classes.arrowForwardIcon} />
          </Button>
        </RouterLink>
      </CardActions>
    </Card>
  )
}

LatestProjects.propTypes = {
  className: PropTypes.string,
}

export default LatestProjects
