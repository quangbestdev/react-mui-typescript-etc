import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import TodoEditModal from './TodoEditModal'

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0,
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
}))

function TodoInfo({ todo, className, ...rest }) {
  const classes = useStyles()
  const [openEdit, setOpenEdit] = useState(false)

  const handleEditOpen = () => {
    setOpenEdit(true)
  }

  const handleEditClose = () => {
    setOpenEdit(false)
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Todo info" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow selected>
              <TableCell>Id</TableCell>
              <TableCell>{todo.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{todo.name}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>User Id</TableCell>
              <TableCell>{todo.userId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>{todo.status}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Created At</TableCell>
              <TableCell>{todo.createdAt}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Updated At</TableCell>
              <TableCell>{todo.updatedAt}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={handleEditOpen}>
          <EditIcon className={classes.buttonIcon} />
          Edit
        </Button>
      </CardActions>
      <TodoEditModal todo={todo} onClose={handleEditClose} open={openEdit} />
    </Card>
  )
}

export default TodoInfo
