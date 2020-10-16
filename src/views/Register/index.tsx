import React from 'react'
import { Box, Grid, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/Layout/Layout'
import RegisterForm from './RegisterForm'

const useStyles = makeStyles((theme: Theme) => ({
  block: {
    backgroundColor: theme.palette.background.primary,
  },
  mobileTextWrapper: {
    margin: theme.spacing(5),
    maxWidth: '100%',
    [theme.breakpoints.up('xl')]: {
      margin: theme.spacing(10),
    },
  },
  workingWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1.5),
  },
  subHeader: {
    marginBottom: theme.spacing(5.5),
    fontWeight: 400,
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  form: {
    width: '100%',
  },
}))

const Register: React.FC = (props) => {
  const classes = useStyles(props)

  return (
    <Layout title="Register">
      <Grid container className={classes.block}>
        <Grid item xs={12} md={4} className={classes.workingWrapper}>
          <Box maxWidth={355} className={classes.mobileTextWrapper}>
            <Typography variant="h3" className={classes.header}>
              Sign up
            </Typography>
            <Typography variant="h6" className={classes.subHeader}>
              Join us for a great chocolatey adventure today!
            </Typography>
            <RegisterForm />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <img src="/others/login/chocolate-box.jpg" alt="Assorted Chocolates" className={classes.image} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Register
