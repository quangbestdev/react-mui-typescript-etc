import React from 'react'
import { Box, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { TRADE_POLICIES } from './const'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      '& .MuiBox-root': {
        marginLeft: theme.spacing(10),
      },
    },
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      width: 750,
      height: 700,
      marginBottom: theme.spacing(0),
    },
  },
  heading: {
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginBottom: theme.spacing(4),
    },
  },
  title: {
    color: theme.palette.text.primary,
    fontWeight: 800,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  description: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      maxWidth: 250,
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 330,
      marginBottom: theme.spacing(8),
    },
  },
}))

const OurTradePolicy: React.FC = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.heading}>
        Our Trade Policy
      </Typography>
      <Box className={classes.content}>
        <img src="/about/trade_policy.png" alt="coffee farm map" className={classes.image} />
        <Box>
          {TRADE_POLICIES.map((policy) => (
            <React.Fragment key={policy.title}>
              <Typography variant="body1" className={classes.title}>
                {policy.title}
              </Typography>
              <Typography variant="body1" className={classes.description}>
                {policy.description}
              </Typography>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default OurTradePolicy
