import React from 'react'
import Link from 'next/link'
import { Box, Button, Container, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.secondary,
    padding: theme.spacing(7, 0),
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(14, 0),
    },
  },
  content: {
    backgroundImage: `url(${'/home/factory_visit_banner.jpg'})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(6, 0),
    },
    [theme.breakpoints.only('sm')]: {
      padding: theme.spacing(4, 0),
    },
    [theme.breakpoints.up('md')]: {
      minHeight: 570,
      padding: theme.spacing(17, 15),
      alignItems: 'flex-start',
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 250,
    },
  },
  subtitle: {
    margin: theme.spacing(2, 0, 4),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 300,
    },
  },
  button: {
    padding: theme.spacing(1, 6),
  },
}))

const FactoryVisitBanner = (props) => {
  const classes = useStyles(props)

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.content}>
          <Typography variant="h1" className={classes.title}>
            Visit the Factory
          </Typography>
          <Typography variant="body2" className={classes.subtitle}>
            Experience a chocolatey journey from Bean, to Bar
          </Typography>
          <Link href="https://bennsethicoa.my/visit" passHref>
            <Button variant="contained" color="secondary" className={classes.button}>
              Book now
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  )
}

export default FactoryVisitBanner
