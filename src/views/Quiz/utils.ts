import { orderBy, groupBy } from 'lodash'
import { CreateSurveyInput, SurveySectionTypeInput, SurveyOutcomeTypeInput } from '@onextech/vts-api'

const compareValueByOp = (a, b, op) => {
  switch (op) {
    case 'gt':
      return a > b
    case 'lt':
      return a < b
    case 'eq':
      return a === b
    case 'ne':
      return a !== b
    default:
      return false
  }
}

/**
 * Return boolean to check if a rule is passed
 * @param {Object} rule
 * @param {Object} answersGroupedBySection
 * @return {Boolean}
 */
const getIsRulePassed = (rule, answersGroupedBySection) => {
  const { type, score, op, section } = rule

  // Rules apply against a section. Get answers of the section that the rule applies to here
  const answers = answersGroupedBySection[section.id]

  if (!answers) return false

  switch (type) {
    case 'QUESTION':
      return answers.some((answer) => compareValueByOp(answer.score, score, op))
    case 'SECTION':
      const answerSum = answers.reduce((acc, answer) => acc + answer.score, 0)
      return compareValueByOp(answerSum, score, op)
    default:
      return false
  }
}

/**
 * Check if each rule is passed based on the given answers
 * @param {Array} rules
 * @param {Array} answers
 * @return {Array}
 */
// isPass: Boolean
const getRulesWithResult = (rules, answers) => {
  // Groups answers by section
  const answersGroupedBySection = groupBy(answers, 'sectionID')

  // Check if rules pass
  const rulesWithResult = rules.map((rule) => {
    const isPass = getIsRulePassed(rule, answersGroupedBySection)
    const nextRule = { ...rule, isPass }
    return nextRule
  })

  return rulesWithResult
}

/**
 * Count the number of rules of an outcome that pass with the given answers
 * @param {Object} outcome
 * @param {Array} answers
 * @return {Object}
 */
const getOutcomeWithResult = (outcome, answers) => {
  const rulesWithResult = getRulesWithResult(outcome.rules, answers)
  const isPassRules = rulesWithResult.filter((rule) => rule.isPass)

  return {
    ...outcome,
    rules: rulesWithResult,
    isPassRules,
    isPassCount: isPassRules.length,
  }
}

/**
 * Calculate the number of rules passed for each outcome
 * @param {Outcome[]} outcomes
 * @param {{ answers: Answer[] }} survey
 * @return {Outcome[]}
 */
const getOutcomesWithResult = (outcomes, survey) => {
  const { answers } = survey
  return outcomes.map((outcome) => getOutcomeWithResult(outcome, answers))
}

/**
 * Get a single recommended outcome by calculating rules against a survey answers
 * Recommend the outcome with the most rules that pass
 * @param {Outcome[]} outcomes
 * @param {{ answers: Answer[] }} survey
 * @return {Outcome}
 */
export const getRecommendedOutcome = (outcomes, survey) => {
  const outcomesWithResult = getOutcomesWithResult(outcomes, survey)
  return orderBy(outcomesWithResult, ['isPassCount'], ['desc'])[0]
}

export const getSurveySections = (surveyAnswers): SurveySectionTypeInput[] => {
  if (!surveyAnswers) return []

  const groupedAnswers = surveyAnswers.reduce(
    (acc, { sectionID, sectionPosition, sectionTitle, questionID, title, choices, score }) => {
      const nextQuestion = {
        questionID,
        title,
        answers: choices,
      }

      if (!acc.hasOwnProperty(sectionID)) {
        acc[sectionID] = {
          sectionID,
          title: sectionTitle,
          position: sectionPosition,
          questions: [nextQuestion],
          score,
        }
      } else {
        acc[sectionID].questions.push(nextQuestion)
        acc[sectionID].score += score
      }

      return acc
    },
    {}
  )

  return Object.values(groupedAnswers)
}

export const getSurveyOutcome = (outcome): SurveyOutcomeTypeInput => {
  if (!outcome) return null

  const { id, title, slug, media, products, recommendedProducts } = outcome
  return { id, title, slug, media, products, recommendedProducts }
}

export const getSurveyInput = (user, survey, outcome): CreateSurveyInput => {
  return {
    userID: user?.id || user?.sub,
    sections: getSurveySections(survey.answers),
    outcome: getSurveyOutcome(outcome),
  }
}
