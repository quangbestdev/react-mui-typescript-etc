import React, { useState, useEffect } from 'react'
import RouterLink from 'next/link'
import clsx from 'clsx'
import moment from 'moment'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Link,
} from '@material-ui/core'
import axios from '../../utils/axios'
import getInitials from '../../utils/getInitials'

const useStyles = makeStyles((theme) => ({
  root: {},
  statsContainer: {
    display: 'flex',
  },
  statsItem: {
    padding: theme.spacing(3),
    flexGrow: 1,
    '&:first-of-type': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
  content: {
    padding: 0,
  },
  date: {
    whiteSpace: 'nowrap',
  },
}))

function CustomerActivity({ className, ...rest }) {
  const classes = useStyles()
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    let mounted = true

    const fetchCustomers = () => {
      axios.get('/api/dashboard/customer-activity').then((response) => {
        if (mounted) {
          setCustomers(response.data.customers)
        }
      })
    }

    fetchCustomers()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Customer Activity" />
      <Divider />
      <div className={classes.statsContainer}>
        <div className={classes.statsItem}>
          <Typography align="center" component="h4" gutterBottom variant="overline">
            Registered
          </Typography>
          <Typography align="center" variant="h3">
            15,245
          </Typography>
        </div>
        <Divider />
        <div className={classes.statsItem}>
          <Typography align="center" component="h4" gutterBottom variant="overline">
            Online
          </Typography>
          <Typography align="center" variant="h3">
            357
          </Typography>
        </div>
      </div>
      <Divider />
      <CardContent className={classes.content}>
        <List disablePadding>
          {customers.map((customer, i) => (
            <ListItem divider={i < customers.length - 1} key={customer.id}>
              <ListItemAvatar>
                <RouterLink href="/management/customers/1" passHref>
                  <Avatar alt="Customer" component="a" src={customer.author.avatar}>
                    {getInitials(customer.author.name)}
                  </Avatar>
                </RouterLink>
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <RouterLink href="/management/customers/1" passHref>
                    <Typography component="a" variant="h6">
                      {customer.author.name}
                    </Typography>
                  </RouterLink>
                }
                secondary={
                  <Typography variant="body2">
                    {customer.description} |{' '}
                    {customer.type === 'payment' && (
                      <RouterLink color="inherit" href="#">
                        See invoice
                      </RouterLink>
                    )}
                  </Typography>
                }
              />
              <Typography className={classes.date} variant="body2">
                {moment(customer.created_at).fromNow()}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

CustomerActivity.propTypes = {
  className: PropTypes.string,
}

export default CustomerActivity
