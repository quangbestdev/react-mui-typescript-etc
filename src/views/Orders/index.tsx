import React, { useState } from 'react'
import { Box, Button, Container, Grid, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ListAltIcon from '@material-ui/icons/ListAlt'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import Layout from '../../components/Layout/Layout'
import Orders from './orders'
import AccountSettings from './accountSettings'

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    background: theme.palette.background.default,
    display: 'flex',
    flex: 1,
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
  },
  accountPageWrapper: {
    display: 'flex',
  },
  header: {
    margin: theme.spacing(6.25, 0, 3.5),
  },
  buttonWrapper: {
    margin: theme.spacing(1.5, 0),
  },
  selectedButton: {
    fontFamily: theme.typography.h1.fontFamily,
    textTransform: 'capitalize',
    fontWeight: 700,
    fontSize: theme.typography.subtitle1.fontSize,
    color: theme.palette.primary.main,
  },
  button: {
    fontFamily: theme.typography.h1.fontFamily,
    textTransform: 'capitalize',
    fontWeight: 400,
    fontSize: theme.typography.subtitle1.fontSize,
    color: theme.palette.text.secondary,
  },
}))

function getAccountPage(view) {
  switch (view) {
    case 'orders':
      return <Orders />
    case 'settings':
      return <AccountSettings />
    default:
  }
}

const Account: React.FC = (props) => {
  const classes = useStyles(props)
  const [view, setView] = useState<'orders' | 'settings'>('orders')

  return (
    <Layout title="Account">
      <Box className={classes.wrapper}>
        <Container maxWidth="lg">
          <Grid container className={classes.contentWrapper}>
            <Grid item xs={12} sm={2}>
              <Typography variant="h4" className={classes.header}>
                My Account
              </Typography>
              <Box className={classes.buttonWrapper}>
                <Button
                  color="primary"
                  className={view === 'orders' ? classes.selectedButton : classes.button}
                  startIcon={<ListAltIcon />}
                  onClick={() => setView('orders')}
                >
                  Orders
                </Button>
              </Box>
              <Box className={classes.buttonWrapper}>
                {/* TODO: Redirect to Separate Account Settings Page when ready */}
                <Button
                  color="primary"
                  className={view === 'settings' ? classes.selectedButton : classes.button}
                  startIcon={<SettingsOutlinedIcon />}
                  onClick={() => setView('settings')}
                >
                  Account Settings
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={10} className={classes.accountPageWrapper}>
              {/* <Orders /> */}
              {getAccountPage(view)}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}

export default Account
