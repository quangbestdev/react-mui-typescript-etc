import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, TextField } from '@material-ui/core'
import ConfirmationCard from '../../components/ConfirmationCard'

const TodoForm = (props) => {
  const { onSubmit, title, onCancel } = props
  const { handleSubmit, control } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ConfirmationCard
        title={title}
        onCancel={onCancel}
        renderConfirm={
          <Button type="submit" color="primary" variant="contained">
            Save
          </Button>
        }
      >
        <Controller
          as={TextField}
          control={control}
          rules={{ required: true }}
          name="name"
          label="Name"
          defaultValue=""
          variant="outlined"
          fullWidth
          autoFocus
        />
      </ConfirmationCard>
    </form>
  )
}

export default TodoForm
