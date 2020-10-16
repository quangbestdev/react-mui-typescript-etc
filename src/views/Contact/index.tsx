import React from 'react'
import { Box, Grid, Snackbar, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/Layout/Layout'
import ContactForm from './ContactForm'

const useStyles = makeStyles((theme: Theme) => ({
  block: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default,
  },
  mobileTextWrapper: {
    margin: theme.spacing(5),
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(5, 8),
    },
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(20, 15),
    },
  },
  header: {
    marginBottom: theme.spacing(1.5),
    fontWeight: 700,
    color: theme.palette.text.tertiary,
  },
  subHeader: {
    marginBottom: theme.spacing(5.5),
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
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

const Contact: React.FC = (props) => {
  const classes = useStyles(props)
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const handleSnackbarClose = () => setOpenSnackbar(false)
  const handleSnackbarOpen = () => setOpenSnackbar(true)

  return (
    <Layout title="Contact">
      <Grid container className={classes.block}>
        <Grid item xs={12} md={6}>
          <Box maxWidth={396} className={classes.mobileTextWrapper}>
            <Box maxWidth={334}>
              <Typography variant="h2" className={classes.header}>
                Contact Us
              </Typography>
            </Box>
            <Typography variant="h6" className={classes.subHeader}>
              Have feedback or special Chocolate orders? Feel free to reach out to us anytime.
            </Typography>

            <ContactForm onSubmitted={handleSnackbarOpen} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <img src="/others/contact/two-hands.jpg" className={classes.image} alt="two-hands" />
        </Grid>
      </Grid>
      {/* Contact Success Notification */}
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        open={openSnackbar}
        message="Your message has been sent!"
      />
    </Layout>
  )
}

export default Contact
