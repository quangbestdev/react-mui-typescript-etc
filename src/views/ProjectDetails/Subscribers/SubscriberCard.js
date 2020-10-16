import React from 'react'
import RouterLink from 'next/link'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Card, CardMedia, CardContent, Grid, Divider, Avatar } from '@material-ui/core'
import Label from '../../../components/Label'

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 125,
  },
  content: {
    paddingTop: 0,
  },
  avatarContainer: {
    marginTop: -32,
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    height: 64,
    width: 64,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: theme.palette.common.white,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}))

function SubscriberCard({ subscriber, className, ...rest }) {
  const classes = useStyles()

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardMedia className={classes.media} image={subscriber.cover} />
      <CardContent className={classes.content}>
        <div className={classes.avatarContainer}>
          <RouterLink href="/profile/[id]/[tab]" as="/profile/1/timeline" passHref alt="Subscriber">
            <Avatar className={classes.avatar} component="a" src={subscriber.avatar} />
          </RouterLink>
        </div>
        <RouterLink href="/profile/[id]/[tab]" as="/profile/1/timeline" passHref>
          <Typography align="center" component="a" display="block" variant="h6">
            {subscriber.name}
          </Typography>
        </RouterLink>
        <Typography align="center" variant="body2">
          {subscriber.common_connections} connections in common
        </Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={1}>
          {subscriber.labels.map((label) => (
            <Grid item key={label}>
              <Label variant="outlined">{label}</Label>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

SubscriberCard.propTypes = {
  className: PropTypes.string,
  subscriber: PropTypes.object.isRequired,
}

export default SubscriberCard
