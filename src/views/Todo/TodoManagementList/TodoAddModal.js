import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, Modal } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { createTodo as CREATE_TODO } from '../../../graphql/mutations'
import { createTodoDefaultInput, createTodoOptimisticResponse, listTodosQuery } from '../../../api/Todo'
import TodoForm from '../TodoForm'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 500,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%',
  },
}))

function TodoAddModal({ open, onClose, todo, className, ...rest }) {
  const classes = useStyles()

  const [createTodo] = useMutation(gql(CREATE_TODO), {
    update(cache, { data: { createTodo } }) {
      const data = cache.readQuery(listTodosQuery)
      data.listTodos.items.push(createTodo)
      cache.writeQuery({
        ...listTodosQuery,
        data,
      })
    },
  })

  const onSubmit = async (data) => {
    onClose()
    const input = createTodoDefaultInput(data)

    createTodo({
      variables: { input },
      optimisticResponse: createTodoOptimisticResponse(data),
    })
  }

  if (!open) return null

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <TodoForm title="Add Todo" onSubmit={onSubmit} renderCancelButton={<Button onClick={onClose}>Close</Button>} />
      </Card>
    </Modal>
  )
}

export default TodoAddModal
