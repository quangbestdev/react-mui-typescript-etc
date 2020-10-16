import React from 'react'
import { CardHeader, CardContent, CardActions, Button, Divider, Theme } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

interface ConfirmationCardProps {
  title?: string
  onCancel?: () => void
  onConfirm?: () => void
  renderConfirm?: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  actions: {
    justifyContent: 'flex-end',
  },
}))

const ConfirmationCard: React.FunctionComponent<ConfirmationCardProps> = (props) => {
  const { renderConfirm, title, onCancel, onConfirm, children } = props
  const classes = useStyles(props)

  return (
    <>
      {title && <CardHeader title={title} />}
      <Divider />
      <CardContent>{children}</CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        {renderConfirm ||
          (onConfirm && (
            <Button onClick={onConfirm} color="primary" variant="contained">
              Confirm
            </Button>
          ))}
      </CardActions>
    </>
  )
}

export default ConfirmationCard
