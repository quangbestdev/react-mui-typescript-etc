import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { colors, Container, Divider, Tab, Tabs } from '@material-ui/core'
import Page from '../../components/Page'
import Header from './Header'
import Summary from './Summary'
import Invoices from './Invoices'
import Logs from './Logs'

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

function CustomerManagementDetails() {
  const router = useRouter()
  const classes = useStyles()

  const { id, tab: currentTab } = router.query

  const tabs = [
    { value: 'summary', label: 'Summary' },
    { value: 'invoices', label: 'Invoices' },
    { value: 'logs', label: 'Logs' },
  ]

  const handleTabsChange = (event, value) => {
    return router.push({ pathname: `/management/customers/[id]/[tab]` }, `/management/customers/${id}/${value}`)
  }

  return (
    <Page className={classes.root} title="Customer Management Details">
      <Container maxWidth={false}>
        <Header />
        <Tabs
          onChange={handleTabsChange}
          className={classes.tabs}
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
          {currentTab === 'summary' && <Summary />}
          {currentTab === 'invoices' && <Invoices />}
          {currentTab === 'logs' && <Logs />}
        </div>
      </Container>
    </Page>
  )
}

CustomerManagementDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default CustomerManagementDetails
