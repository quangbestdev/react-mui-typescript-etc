import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Typography, Theme } from '@material-ui/core'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import { QuizQuestionTypeEnum as QuestionType } from '@onextech/vts-api'
import CheckIcon from '@material-ui/icons/Check'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

export interface Choice {
  label: string
  value: number
}

export interface Question {
  id: number
  section: string
  question: any
  choices: any
}

export interface DiagnosisQuestionProps {
  query: Question
  handleSubmit: (value: number) => () => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  header: {
    margin: theme.spacing(5.625, 0),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(5, 0),
      fontSize: theme.typography.pxToRem(32),
    },
  },
  caption: {
    marginBottom: theme.spacing(1),
  },
  buttonWrapper: {
    display: 'block',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      '& > .MuiButton-root, .MuiButton-root.MuiButton-outlined': {
        padding: theme.spacing(2, 4),
      },
    },
  },
  button: {
    background: theme.palette.background.paper,
    borderColor: theme.palette.border.main,
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: 1.2,
    width: 500,
    minHeight: 65,
    textTransform: 'none',
    marginBottom: theme.spacing(2),
    '& .MuiButton-label': {
      fontSize: theme.typography.pxToRem(20),
    },
    [theme.breakpoints.down('sm')]: {
      '& .MuiButton-label': {
        fontSize: theme.typography.pxToRem(14),
      },
      width: 280,
      minHeight: 45,
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  backButton: {
    '&:hover': {
      background: 'none',
    },
    '& > .MuiButton-label > .MuiButton-startIcon': {
      marginRight: 0,
    },
    color: theme.palette.secondary.light,
    fontWeight: 600,
    marginLeft: theme.spacing(1),
  },
  checkboxButton: {
    marginRight: theme.spacing(1),
  },
  actionButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    width: 500,
    [theme.breakpoints.down('sm')]: {
      width: 280,
    },
  },
}))

const DiagnosisQuestion = (props) => {
  const classes = useStyles(props)
  const { question, handleSubmit, handleBack } = props
  const { choices = [] } = question

  const [checkboxes, setCheckboxes] = useState(new Array(choices.length).fill(false))
  const isCheckbox = question?.type === QuestionType.checkbox

  const handleCheckboxSubmit = () => {
    const nextAnswer = {
      ...question,
      choices: choices.filter((choice, index) => checkboxes[index]),
    }
    handleSubmit(nextAnswer)
  }

  const handleCheckboxClick = (index) => {
    setCheckboxes((prevCheckboxes) => {
      const nextCheckboxes = [...prevCheckboxes]
      nextCheckboxes[index] = !prevCheckboxes[index]
      return nextCheckboxes
    })
  }

  const handleRadioClick = (choice) => {
    handleSubmit({
      ...question,
      choices: [choice],
    })
  }

  return (
    <Box className={classes.root}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" className={classes.header}>
          {question?.title}
        </Typography>
        {isCheckbox && (
          <Typography variant="caption" className={classes.caption}>
            *Choose one or more options that meet your condition
          </Typography>
        )}
        {/* Buttons to select Age Range */}
        {choices.map((choice, index) => (
          <Box className={classes.buttonWrapper} key={choice.title}>
            <Button
              variant="outlined"
              onClick={() => (isCheckbox ? handleCheckboxClick(index) : handleRadioClick(choice))}
              classes={{
                root: classes.button,
              }}
              startIcon={checkboxes[index] && <CheckIcon />}
            >
              {choice.title}
            </Button>
          </Box>
        ))}
      </Box>
      <Box justifyContent={isCheckbox ? 'space-around' : 'flex-start'} className={classes.actionButtonWrapper}>
        {question?.position > 0 && (
          <Button startIcon={<ChevronLeftIcon />} onClick={handleBack} className={classes.backButton}>
            Back
          </Button>
        )}
        {isCheckbox && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleCheckboxSubmit}
            className={classes.checkboxButton}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default DiagnosisQuestion
