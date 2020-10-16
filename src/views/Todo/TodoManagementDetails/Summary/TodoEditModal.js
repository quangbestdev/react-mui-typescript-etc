import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, Modal } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import TodoForm from '../../TodoForm'
import { updateTodo as UPDATE_TODO } from '../../../../graphql/mutations'
import { updateTodoDefaultInput, updateTodoOptimisticResponse, listTodosQuery } from '../../../../api/Todo'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%',
  },
}))

function TodoEditModal(props) {
  const { open, onClose, todo, className, ...rest } = props
  const classes = useStyles()

  const [updateTodo] = useMutation(gql(UPDATE_TODO), {
    update(cache, { data: { updateTodo } }) {
      const data = cache.readQuery(listTodosQuery)
      const updateIndex = data.listTodos.items.findIndex((item) => item.id === updateTodo.id)
      if (updateIndex >= 0) data.listTodos.items[updateIndex] = updateTodo
      cache.writeQuery({
        ...listTodosQuery,
        data,
      })
    },
  })

  const onSubmit = async (data) => {
    onClose()
    const input = updateTodoDefaultInput({ ...data, id: todo.id })

    const onUpdate = await updateTodo({
      variables: { input },
      optimisticResponse: updateTodoOptimisticResponse(data),
    })
  }

  if (!open) return null

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <TodoForm title="Edit Todo" onSubmit={onSubmit} onCancel={onClose} />
      </Card>
    </Modal>
  )
}

export default TodoEditModal
