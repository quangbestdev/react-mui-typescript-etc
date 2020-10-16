import React from 'react'
import RouterLink from 'next/link'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Card, CardContent, CardHeader, Divider, Grid, Link, Typography } from '@material-ui/core'
import getInitials from '../../../utils/getInitials'
import ReviewStars from '../../../components/ReviewStars'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    paddingBottom: 0,
  },
  subheader: {
    flexWrap: 'wrap',
    display: 'flex',
    alignItems: 'center',
  },
  stars: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  rating: {
    marginLeft: theme.spacing(1),
    fontWeight: theme.typography.fontWeightBold,
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  message: {
    padding: theme.spacing(2, 3),
  },
  details: {
    padding: theme.spacing(2, 3),
  },
}))

function ReviewCard({ review, className, ...rest }) {
  const classes = useStyles()

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        avatar={
          <Avatar alt="Reviewer" className={classes.avatar} src={review.reviewer.avatar}>
            {getInitials(review.reviewer.name)}
          </Avatar>
        }
        className={classes.header}
        disableTypography
        subheader={
          <div className={classes.subheader}>
            <div className={classes.stars}>
              <ReviewStars value={review.rating} />
              <Typography className={classes.rating} variant="h6">
                {review.rating}
              </Typography>
            </div>
            <Typography variant="body2">
              | Reviewd by{' '}
              <RouterLink href="/profile/[id]/[tab]" as="/profile/1/timeline" passHref>
                <Link color="textPrimary" component="a" variant="h6">
                  {review.reviewer.name}
                </Link>
              </RouterLink>{' '}
              | {moment(review.created_at).fromNow()}
            </Typography>
          </div>
        }
        title={
          <RouterLink href="/management/customers/[id]/[tab]" as="/management/customers/1/overview" passHref>
            <Link color="textPrimary" component="a" variant="h5">
              {review.project.title}
            </Link>
          </RouterLink>
        }
      />
      <CardContent className={classes.content}>
        <div className={classes.message}>
          <Typography variant="subtitle2">{review.message}</Typography>
        </div>
        <Divider />
        <div className={classes.details}>
          <Grid alignItems="center" container justify="space-between" spacing={3}>
            <Grid item>
              <Typography variant="h5">
                {review.currency}
                {review.project.price}
              </Typography>
              <Typography variant="body2">Project price</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {review.currency}
                {review.pricePerHour}
              </Typography>
              <Typography variant="body2">Per project</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">{review.hours}</Typography>
              <Typography variant="body2">Hours</Typography>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  )
}

ReviewCard.propTypes = {
  className: PropTypes.string,
  review: PropTypes.object.isRequired,
}

export default ReviewCard
