import React from 'react'
import { Avatar, Paper, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

interface TestimonialCardProps {
  title: string
  rating: number
  user: {
    name: string
    image: string
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(2),
  },
  rating: {
    marginBottom: theme.spacing(2.5),
  },
  userAvatar: {
    width: 64,
    height: 64,
    marginBottom: theme.spacing(1),
  },
  userName: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}))

const TestimonialCard: React.FC<TestimonialCardProps> = (props) => {
  const { title, rating, user } = props
  const classes = useStyles({})

  return (
    <Paper className={classes.root} elevation={0}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <Rating defaultValue={rating} max={rating} size="large" className={classes.rating} readOnly />
      {/* TODO: replace with image asset */}
      {user.image && <Avatar src={user.image} className={classes.userAvatar} />}
      <Typography variant="h6" className={classes.userName}>
        {user.name}
      </Typography>
    </Paper>
  )
}

export default TestimonialCard
