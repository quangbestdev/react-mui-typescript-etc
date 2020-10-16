import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Tabs, Tab, Divider, colors } from '@material-ui/core'
import { useRouter } from 'next/router'
import Page from '../../components/Page'
import Header from './Header'
import General from './General'
import Subscription from './Subscription'
import Notifications from './Notifications'
import Security from './Security'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  tabs: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  content: {
    marginTop: theme.spacing(3),
  },
}))

function Settings() {
  const router = useRouter()
  const classes = useStyles()
  const { tab: currentTab } = router.query
  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'subscription', label: 'Subscription' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Security' },
  ]

  const handleTabsChange = (event, value) => {
    return router.push(`/settings/[tab]`, `/settings/${value}`)
  }

  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Header />
        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={currentTab}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {currentTab === 'general' && <General />}
          {currentTab === 'subscription' && <Subscription />}
          {currentTab === 'notifications' && <Notifications />}
          {currentTab === 'security' && <Security />}
        </div>
      </Container>
    </Page>
  )
}

Settings.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default Settings
