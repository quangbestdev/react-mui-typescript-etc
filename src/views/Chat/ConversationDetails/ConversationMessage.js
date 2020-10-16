import React from 'react'
import RouterLink from 'next/link'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Link, Avatar, colors } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  authUser: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& $body': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  inner: {
    display: 'flex',
    maxWidth: 500,
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  body: {
    backgroundColor: colors.grey[100],
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 2),
  },
  content: {
    marginTop: theme.spacing(1),
  },
  image: {
    marginTop: theme.spacing(2),
    height: 'auto',
    width: 380,
    maxWidth: '100%',
  },
  footer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

function ConversationMessage({ message, className, ...rest }) {
  const classes = useStyles()

  return (
    <div
      {...rest}
      className={clsx(
        classes.root,
        {
          [classes.authUser]: message.sender.authUser,
        },
        className
      )}
    >
      <div className={classes.inner}>
        <RouterLink href="/profile/[id]/[tab]" as="/profile/1/timeline" passHref>
          <Avatar className={classes.avatar} component="a" src={message.sender.avatar} />
        </RouterLink>
        <div>
          <div className={classes.body}>
            <div>
              <RouterLink href="/profile/[id]/[tab]" as="/profile/1/timeline" passHref>
                <Link color="inherit" component="a" variant="h6">
                  {message.sender.authUser ? 'Me' : message.sender.name}
                </Link>
              </RouterLink>
            </div>
            <div className={classes.content}>
              {message.contentType === 'image' ? (
                <img alt="Attachment" className={classes.image} src={message.content} />
              ) : (
                <Typography color="inherit" variant="body1">
                  {message.content}
                </Typography>
              )}
            </div>
          </div>
          <div className={classes.footer}>
            <Typography className={classes.time} variant="body2">
              {moment(message.created_at).fromNow()}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

ConversationMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.object.isRequired,
}

export default ConversationMessage
