import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Stepper, Step, StepLabel } from '@material-ui/core'
import Layout from '../../components/Layout/Layout'
import FormView from './FormView'
import ForgotPasswordForm from './ForgotPasswordForm'
import ResetPasswordForm from './ResetPasswordForm'
import ConfirmPasswordView from './ConfirmPasswordView'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  stepper: {
    background: theme.palette.background.default,
    marginTop: theme.spacing(4),
  },
}))

const steps = ['Forgot Password', 'Reset Password', 'Password Updated!']

const ForgotPassword = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [email, setEmail] = useState('')

  const handleNext = ({ email }) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    if (email) setEmail(email)
  }

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <FormView title="Enter Your Email">
            <ForgotPasswordForm onSubmit={handleNext} />
          </FormView>
        )
      case 1:
        return (
          <FormView title="Reset Password">
            <ResetPasswordForm onSubmit={handleNext} email={email} />
          </FormView>
        )
      case 2:
        return <ConfirmPasswordView />
      default:
        return (
          <FormView title="Enter Your Email">
            <ForgotPasswordForm onSubmit={handleNext} />
          </FormView>
        )
    }
  }

  return (
    <Layout title="Forgot password">
      <Box className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
      </Box>
    </Layout>
  )
}

export default ForgotPassword
