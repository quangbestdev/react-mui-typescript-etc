import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Theme } from '@material-ui/core'
import { S3Image } from '@onextech/gvs-kit/core'

const useStyles = makeStyles((theme: Theme) => ({
  introTitle: {
    marginBottom: theme.spacing(2, 0, 1),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
    },
  },
  introSubtitle: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.dark,
    fontWeight: 300,
    maxWidth: 280,
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('md')]: {
      maxWidth: 580,
      marginBottom: theme.spacing(3),
    },
  },
  introContent: {
    fontWeight: 400,
    color: theme.palette.secondary.main,
    maxWidth: 280,
    [theme.breakpoints.up('md')]: {
      maxWidth: 480,
    },
  },
  tailoredForImg: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 295,
    },
  },
  tailoredForLabelWrapper: {
    backgroundColor: theme.palette.secondary.light,
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2)',
    maxWidth: 150,
    height: 235,
    margin: theme.spacing(1, 0, 0, 0.5),
    [theme.breakpoints.up('md')]: {
      maxWidth: 200,
      height: 330,
      margin: theme.spacing(3, 0, 0, 2),
    },
  },
  tailoredForBox: {
    border: `2px solid ${theme.palette.secondary.light}`,
    margin: `0 auto ${theme.spacing(1)}px`,
    maxWidth: 135,
    [theme.breakpoints.up('md')]: {
      maxWidth: 170,
    },
  },
  tailoredForRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 0.5),
    color: theme.palette.text.secondary,
    '&:not(:last-child)': {
      borderBottom: `0.8px solid ${theme.palette.secondary.light}`,
    },
    maxWidth: 135,
    [theme.breakpoints.up('md')]: {
      maxWidth: 170,
    },
  },
  tailoredForTitle: {
    color: theme.palette.primary.main,
    fontFamily: theme.typography.h1.fontFamily,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: theme.spacing(2, 0),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 0, 2),
    },
  },
  tailoredForRowTitle: {
    color: theme.palette.text.secondary,
    fontWeight: 600,
  },
  tailoredForRowContent: {
    color: theme.palette.text.secondary,
  },
  imageWrapper: {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    '& > img': {
      width: '100%',
    },
  },
}))

const IntroCard = (props) => {
  const { outcome, user } = props
  const classes = useStyles(props)

  return (
    <Grid container spacing={3}>
      {/* Dear [User Name] */}
      <Grid item xs={12} sm={8}>
        <Typography variant="h2" className={classes.introTitle}>
          Dear {user?.name},
        </Typography>
        <Typography variant="h3" className={classes.introSubtitle}>
          Meet your custom skincare regime, powered by science.
        </Typography>
        <Typography variant="h6" className={classes.introContent}>
          Based on your skin analysis, you have {outcome?.content}.
        </Typography>
      </Grid>

      {/* Tailored for [User Name] */}
      <Grid item xs={10} sm={4} className={classes.imageWrapper}>
        <S3Image path={outcome?.media?.[0]?.src} className={classes.tailoredForImg} />
      </Grid>
    </Grid>
  )
}

export default IntroCard
