import React, { useState, useEffect } from 'react'
import validate from 'validate.js'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, TextField } from '@material-ui/core'
import { EnquiryStatusEnum } from '@onextech/etc-api'
import { useCreateEnquiry } from '../../graphql/enquiry/mutations'

interface ContactFormProps {
  className?: string
  onSubmitted: () => void
}

interface ContactFormValues {
  name?: string
  email?: string
  message?: string
}

interface ContactFormFieldState {
  name?: boolean
  email?: boolean
  message?: boolean
}

interface ContactFormState {
  isValid: boolean
  values: ContactFormValues
  touched: ContactFormFieldState
  errors: ContactFormFieldState
}

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
  },
  message: {
    presence: { allowEmpty: false, message: 'is required' },
  },
}

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: theme.spacing(5),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
    },
    '& input': {
      padding: theme.spacing(1.5, 0),
    },
  },
}))

const ContactForm: React.FC<ContactFormProps> = (props) => {
  const { className, onSubmitted, ...rest } = props
  const classes = useStyles()

  const defaultFormState = {
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  }

  const [formState, setFormState] = useState<ContactFormState>(defaultFormState)

  const handleChange = (event) => {
    event.persist()

    setFormState((prevFormState) => ({
      ...prevFormState,
      values: {
        ...prevFormState.values,
        [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      },
      touched: {
        ...prevFormState.touched,
        [event.target.name]: true,
      },
    }))
  }

  const { handleCreateEnquiry } = useCreateEnquiry()

  const handleSubmit = async (event) => {
    const { email, name, message } = formState.values
    event.preventDefault()
    handleCreateEnquiry({
      name,
      email,
      content: message,
      status: EnquiryStatusEnum.new,
    })
    // Set the snackbar open
    onSubmitted()
    // Reset the form
    setFormState(defaultFormState)
  }

  const hasError = (field: string) => Boolean(formState.touched[field] && formState.errors[field])

  useEffect(() => {
    const errors = validate(formState.values, schema)

    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {},
    }))
  }, [formState.values])

  return (
    <form {...rest} className={clsx(className)} onSubmit={handleSubmit}>
      <Box className={classes.field}>
        <TextField
          required
          error={hasError('name')}
          fullWidth
          helperText={hasError('name') ? formState.errors.name[0] : ''}
          label="Name"
          name="name"
          onChange={handleChange}
          value={formState.values.name || ''}
          placeholder="Enter your name"
          InputLabelProps={{ required: false, shrink: true }}
          multiline
        />
      </Box>
      <div className={classes.field}>
        <TextField
          required
          error={hasError('email')}
          fullWidth
          helperText={hasError('email') ? formState.errors.email[0] : ''}
          label="Email"
          name="email"
          onChange={handleChange}
          value={formState.values.email || ''}
          placeholder="Enter your email"
          InputLabelProps={{ required: false, shrink: true }}
        />
      </div>
      <div className={classes.field}>
        <TextField
          required
          error={hasError('message')}
          fullWidth
          helperText={hasError('message') ? formState.errors.message[0] : ''}
          label="Message"
          name="message"
          onChange={handleChange}
          value={formState.values.message || ''}
          placeholder="Enter your message"
          InputLabelProps={{ required: false, shrink: true }}
          multiline
          rows={4}
        />
      </div>
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={!formState.isValid}>
        Submit
      </Button>
    </form>
  )
}

export default ContactForm
