import React, { useState, useEffect, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import difference from 'lodash/difference'
import Layout from '../../components/Layout/Layout'
import useGetQuiz from '../../graphql/quiz/queries/useGetQuiz'
import SkinQuizIntro from './SkinQuiz/SkinQuizIntro'
import SkinQuizName from './SkinQuiz/SkinQuizName'
import SkinQuizQuestions from './SkinQuiz/SkinQuizQuestions'
import QuizResultsUI from './results'
import { getRecommendedOutcome, getSurveyInput } from './utils'
import { useAuth } from '../../auth'
import SkinQuizPassword from './SkinQuiz/SkinQuizPassword'
import SkinQuizEmail from './SkinQuiz/SkinQuizEmail'
import { UserInterface } from '../../graphql/user/typing'
import { logEvent } from '../../lib/GoogleAnalytics'
import { useCreateSurvey } from '../../graphql/survey/mutations'

const LAST_STEP = 5

const useStyles = makeStyles((theme) => ({
  layout: {
    backgroundColor: theme.palette.background.default,
  },
}))

function getStepContent(step: number, stepperProps: any, quizQuestionProps: any, quizResultProps: any, userProps: any) {
  switch (step) {
    case 0:
      return <SkinQuizIntro {...stepperProps} />
    case 1:
      return <SkinQuizName {...stepperProps} {...userProps} />
    case 2:
      return <SkinQuizQuestions {...stepperProps} {...quizQuestionProps} />
    case 3:
      return <SkinQuizEmail {...stepperProps} {...userProps} />
    case 4:
      return <SkinQuizPassword {...stepperProps} {...userProps} />
    case LAST_STEP:
      return <QuizResultsUI {...quizResultProps} />
    default:
      return 'Unknown step'
  }
}

interface UserData extends UserInterface {
  password?: string
}

function HorizontalLinearStepper() {
  const classes = useStyles()

  const { handleCreateSurvey } = useCreateSurvey()
  const [activeStep, setActiveStep] = useState(0)

  // Quiz progress states
  const [skippedQuestions, setSkippedQuestions] = useState([])
  const [addedProducts, setAddedProducts] = useState([])
  const [lastAnswer, setLastAnswer] = useState([])

  // Submitted quiz states
  const [survey, setSurvey] = useState({ answers: [] })
  const [quizOutcome, setQuizOutcome] = useState(null)

  // Fetching User
  const { user, loading: userLoading, signUp, signIn } = useAuth()

  const [userData, setUserData] = useState<UserData>(user)
  const [guestAuthError, setGuestAuthError] = useState()
  const isAuthenticated = Boolean(userData?.id)

  useEffect(() => {
    setUserData(user)
  }, [userLoading, user])

  // Fetching Quiz
  const prodQuizID = 'QVxI6bLadXAXmJh4CrEe8' // Production quizID TODO: Replace with type instead of id
  const devQuizID = 'aohnk6YNaW70DQbflDJpz' // Dev env quizID
  const quizID = process.env.NODE_ENV !== 'production' ? devQuizID : prodQuizID
  const { quiz, loading } = useGetQuiz({ variables: { id: quizID } })

  // Update Survey state on Quiz load
  useEffect(() => {
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      title: quiz?.title,
    }))
  }, [loading, quiz])

  // Flatten sections[].questions to questions[]
  const questions = useMemo(() => {
    return quiz?.sections?.reduce(
      (questionArr, { id: sectionID, position: sectionPosition, title: sectionTitle, questions }) =>
        questionArr.concat(
          questions.map(({ id: questionID, ...rest }) => {
            return {
              ...rest,
              questionID,
              sectionID,
              sectionPosition,
              sectionTitle,
            }
          })
        ),
      []
    )
  }, [loading, quiz])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
  }
  const stepperProps = {
    next: handleNext,
    back: handleBack,
    reset: handleReset,
  }

  // getQuiz loading
  if (loading) return null

  // Quiz Progress
  const isStepSkipped = (step: string) => {
    return skippedQuestions.includes(step)
  }

  const handleNextQuestion = (answer) => {
    const { questionID, title, choices, sectionID, sectionTitle, sectionPosition } = answer
    // Update the last answer
    setLastAnswer((prev) => prev.concat(answer))

    // Update added products and questions to be skipped
    const nextAddedProducts = []
    const nextSkippedQuestions = []
    choices?.forEach(({ actions }) => {
      actions?.addProducts?.forEach(({ id }) => id && nextAddedProducts.push(id))
      actions?.skipQuestions?.forEach(({ id }) => id && nextSkippedQuestions.push(id))
    })
    setAddedProducts((prevProducts) => prevProducts.concat(nextAddedProducts))
    setSkippedQuestions((prevSkipped) => prevSkipped.concat(nextSkippedQuestions))

    // Update survey result
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      answers: prevSurvey.answers.concat([
        {
          sectionID,
          sectionTitle,
          sectionPosition,
          questionID,
          title,
          choices: choices?.map(({ title }) => title),
          score: choices?.reduce((scoreTotal, { score }) => scoreTotal + score, 0),
        },
      ]),
    }))
  }

  const handlePrevQuestion = () => {
    // Retrived user's last answer and pop it from last answer state
    const answer = lastAnswer[lastAnswer.length - 1]
    setLastAnswer((prev) => prev.slice(0, prev.length - 1))

    // Update addedProducts and skippedQuestions
    const lastAddedProducts = []
    const lastSkippedQuestions = []
    answer?.choices?.forEach(({ actions }) => {
      actions?.addProducts?.forEach(({ id }) => id && lastAddedProducts.push(id))
      actions?.skipQuestions?.forEach(({ id }) => id && lastSkippedQuestions.push(id))
    })
    setAddedProducts((prev) => difference(prev, lastAddedProducts))
    setSkippedQuestions((prev) => difference(prev, lastSkippedQuestions))

    // Pop the last survey
    setSurvey((prev) => ({
      ...prev,
      answers: prev.answers.slice(0, prev.answers.length - 1),
    }))
  }

  const handleSubmitQuiz = async () => {
    const recommendedOutcome = getRecommendedOutcome(quiz?.outcomes, survey)
    setQuizOutcome(recommendedOutcome)

    // Create Survey if user is currently logged in
    if (isAuthenticated) {
      const surveyInput = getSurveyInput(userData, survey, recommendedOutcome)
      await handleCreateSurvey(surveyInput)
    }

    handleNext()
  }

  // User Form Authentication (name, email, password)
  const handleGuestSignUp = async (user: UserData) => {
    const { name, email, password } = user
    const onSignUp = await signUp({ username: email, password, attributes: { name } })
    if (onSignUp) {
      const { user, error } = onSignUp
      logEvent({ action: 'signup', category: 'acquisition' })

      // Create Survey
      if (!error) {
        const surveyInput = getSurveyInput(user, survey, quizOutcome)
        await handleCreateSurvey(surveyInput)
        handleNext()
      } else {
        setGuestAuthError(error)
      }
    }
  }

  const handleGuestLogin = async () => {
    const { email, password } = userData
    const { user, error } = await signIn({ username: email, password })

    // Create Survey
    if (!error) {
      const surveyInput = getSurveyInput(user, survey, quizOutcome)
      await handleCreateSurvey(surveyInput)
      handleNext()
    } else {
      setGuestAuthError(error)
    }
  }

  const userProps = {
    useUserData: () => ({ isAuthenticated, userData, setUserData }),
    useGuestAuthError: () => ({ guestAuthError, setGuestAuthError }),
    handleGuestLogin,
    handleGuestSignUp,
  }

  const quizQuestionProps = {
    questions,
    isStepSkipped,
    handleNextQuestion,
    handleSubmitQuiz,
    handlePrevQuestion,
    lastQuestionNo: lastAnswer.length ? lastAnswer[lastAnswer.length - 1].position : 0,
  }

  const quizResultProps = {
    user: userData,
    outcome: quizOutcome,
    additionalProducts: addedProducts,
  }

  return (
    <Layout title="Quiz" showFooter={activeStep === LAST_STEP} className={classes.layout}>
      <section>{getStepContent(activeStep, stepperProps, quizQuestionProps, quizResultProps, userProps)}</section>
    </Layout>
  )
}

const QuizHome: React.FC = () => {
  return <HorizontalLinearStepper />
}

export default QuizHome
