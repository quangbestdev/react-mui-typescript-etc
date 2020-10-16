import React, { useState } from 'react'
import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ProgressBar from '../components/ProgressBar'
import DiagnosisQuestion from '../components/DiagnosisQuestion'
import SkinQuizLayout from './SkinQuizLayout'

const useStyles = makeStyles((theme: Theme) => ({
  block: {
    height: '90vh',
    backgroundImage: `url(
        '/quiz/succulents-and-cactus.png'
      )`,
    backgroundPosition: 'center bottom',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 390,
    [theme.breakpoints.up('md')]: {
      height: '85vh',
      backgroundPosition: `right bottom ${theme.spacing(5)}px`,
      position: 'fixed',
    },
    [theme.breakpoints.down('sm')]: {
      height: 950,
    },
    [theme.breakpoints.down('xs')]: {
      height: 900,
    },
    '& > .MuiContainer-root': {
      justifyContent: 'space-between',
      height: '85vh',
    },
    '& > .MuiBox-root': {
      position: 'relative',
    },
  },
  progressBar: {
    paddingTop: 0,
  },
}))

const SkinQuizQuestions = (props) => {
  const classes = useStyles(props)

  const { questions, isStepSkipped, handleNextQuestion, handleSubmitQuiz, handlePrevQuestion, lastQuestionNo } = props

  // Set quiz flow direction (nextButton=forward, backButton=reverse)
  const [reverse, setReverse] = useState(false)
  const [questionNo, setQuestionNo] = useState(0)
  const progressLevel = ((questionNo / questions.length) * 100).toFixed(0)

  const back = () => {
    setQuestionNo(lastQuestionNo)
  }

  const handleBack = () => {
    setReverse(true)
    back()
    handlePrevQuestion()
  }

  const handleNext = () => {
    if (questionNo === questions.length - 1) {
      handleSubmitQuiz()
    } else {
      setQuestionNo((prevNo) => prevNo + 1)
    }
  }

  const handleSubmitAnswer = (answer) => {
    setReverse(false)
    handleNextQuestion(answer)
    handleNext()
  }

  const currentQuestion = { ...questions[questionNo], position: questionNo }
  const isSkipped = questionNo < questions.length && isStepSkipped(currentQuestion.questionID)
  if (isSkipped) {
    if (reverse) back()
    else handleNext()
  }

  return (
    <SkinQuizLayout className={classes.block}>
      <DiagnosisQuestion question={currentQuestion} handleSubmit={handleSubmitAnswer} handleBack={handleBack} />
      <ProgressBar
        questionNo={questionNo}
        questionTotal={questions.length}
        progressLevel={progressLevel}
        className={classes.progressBar}
      />
    </SkinQuizLayout>
  )
}

export default SkinQuizQuestions
