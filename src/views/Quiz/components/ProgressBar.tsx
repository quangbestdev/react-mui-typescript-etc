import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import clsx from 'clsx'

interface ProgressBarProps {
  questionNo: number
  questionTotal: number
  progressLevel: string
  className?: string
}

const useStyles = makeStyles((theme) => ({
  progressBarWrapper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    width: '100%',
  },
  progressBar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: 3,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 5,
    maxWidth: 430,
    margin: '0 auto',
    marginBottom: theme.spacing(1),
  },
  progress: (props: ProgressBarProps) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: `${props.progressLevel}%`,
    borderRadius: 5,
    backgroundColor: theme.palette.secondary.light,
  }),
  startDot: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: '50%',
    height: 7,
    width: 7,
    position: 'relative',
  },
  progressDot: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: '50%',
    height: 12,
    width: 12,
    position: 'absolute',
    left: 'calc(100% - 5px)',
  },
  progressTick: {
    margin: 0,
    fontSize: theme.typography.pxToRem(9),
    color: theme.palette.background.paper,
  },
  endDot: (props: ProgressBarProps) => ({
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    height: 7,
    width: 7,
    position: 'absolute',
    left: 'calc(100% - 5px)',
    display: props.progressLevel === '100' ? 'none' : 'block',
  }),
  progressText: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: theme.palette.secondary.light,
    fontWeight: 600,
  },
}))

const ProgressBar: React.FunctionComponent<ProgressBarProps> = (props) => {
  const { questionNo, questionTotal, className } = props

  const classes = useStyles(props)

  return (
    <Box className={clsx(classes.progressBarWrapper, className)}>
      <Box className={classes.progressBar}>
        <span className={classes.progress}>
          <span className={classes.startDot} />
          <span className={classes.progressDot}>
            <p className={classes.progressTick}>&#10003;</p>
          </span>
        </span>
        <span className={classes.endDot} />
      </Box>
      <Typography variant="caption" className={classes.progressText}>
        Your Skin Diagnosis {questionNo} / {questionTotal}
      </Typography>
    </Box>
  )
}

export default ProgressBar
