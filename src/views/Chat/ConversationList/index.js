import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, IconButton, Input, List, Toolbar, Tooltip } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useRouter } from 'next/router'
import ConversationListItem from './ConversationListItem'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
  },
  searchInput: {
    flexGrow: 1,
  },
}))

function ConversationList({ conversations, className, ...rest }) {
  const router = useRouter()
  const { id } = router.query
  const classes = useStyles()
  const selectedConversation = id

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <Input className={classes.searchInput} disableUnderline placeholder="Search contacts" />
        <Tooltip title="Search">
          <IconButton edge="end">
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider />
      <List disablePadding>
        {conversations.map((conversation, i) => (
          <ConversationListItem
            active={conversation.id === selectedConversation}
            conversation={conversation}
            divider={i < conversations.length - 1}
            key={conversation.id}
          />
        ))}
      </List>
    </div>
  )
}

ConversationList.propTypes = {
  className: PropTypes.string,
  conversations: PropTypes.array.isRequired,
}

export default ConversationList
