import React from 'react'
import { Box, Typography } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageCocoaTree: {
    width: 340,
    height: 280,
    marginBottom: theme.spacing(5),
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      height: 'auto',
    },
  },
  imageBoatLake: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  description: {
    maxWidth: 790,
    textAlign: 'center',
    lineHeight: 1.5,
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(14),
    },
  },
}))

const CompanyStatement: React.FC = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <img src="/about/cocoa_tree.png" alt="cocoa tree" className={classes.imageCocoaTree} />
      <Typography variant="h3" className={classes.title}>
        Revitalizing the Asian cacao industry
      </Typography>
      <Typography variant="body1" className={classes.description}>
        There are many farmers out there who are underpaid and overworked for their quality produce, that’s why we are
        firm believers that everyone should be treated fairly. As we continue to support the farmers in Asia who are
        dedicated to their process in cultivating high quality cacao, join us on a journey to discovering their stories
        and how we can change lives one origin at a time.
      </Typography>
      <img src="/about/boat_in_lake.jpg" alt="boat in lake" className={classes.imageBoatLake} />
    </Box>
  )
}

export default CompanyStatement
