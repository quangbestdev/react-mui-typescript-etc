import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import {
  Box,
  ExpansionPanel as MUIExpansionPanel,
  ExpansionPanelProps as MUIExpansionPanelProps,
  ExpansionPanelSummary as MUIExpansionPanelSummary,
  ExpansionPanelDetails as MUIExpansionPanelDetails,
  Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export interface ExpansionPanelProps extends MUIExpansionPanelProps {
  header: string
  details: string
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginBottom: theme.spacing(3),
    '& .MuiExpansionPanelSummary-content.Mui-expanded': {
      margin: theme.spacing(1.5, 0),
    },
    '& .MuiPaper-root .MuiExpansionPanelSummary-root .MuiExpansionPanelSummary-expandIcon': {
      color: theme.palette.text.secondary,
    },
  },
  header: {
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 600,
  },
  details: {
    color: theme.palette.text.secondary,
    fontWeight: 400,
  },
}))

const StyledExpansionPanel = withStyles((theme) => ({
  root: {
    border: '0',
    background: theme.palette.background.default,
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
}))(MUIExpansionPanel)

const ExpansionPanel: React.FC<ExpansionPanelProps> = (props) => {
  const classes = useStyles()
  const { header, details } = props
  return (
    <Box className={classes.wrapper}>
      <StyledExpansionPanel>
        <MUIExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls={header} id={header}>
          <Typography variant="h5" className={classes.header}>
            {header}
          </Typography>
        </MUIExpansionPanelSummary>
        <MUIExpansionPanelDetails>
          <Typography variant="h6" className={classes.details}>
            {details}
          </Typography>
        </MUIExpansionPanelDetails>
      </StyledExpansionPanel>
    </Box>
  )
}

export default ExpansionPanel
