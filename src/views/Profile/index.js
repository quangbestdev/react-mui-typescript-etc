import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colors, Container, Divider, Tab, Tabs } from '@material-ui/core'
import { useRouter } from 'next/router'
import Page from '../../components/Page'
import Header from './Header'
import Timeline from './Timeline'
import Connections from './Connections'
import Projects from './Projects'
import Reviews from './Reviews'

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  content: {
    marginTop: theme.spacing(3),
  },
}))

function Profile() {
  const router = useRouter()
  const classes = useStyles()

  const { id, tab: currentTab } = router.query

  const tabs = [
    { value: 'timeline', label: 'Timeline' },
    { value: 'connections', label: 'Connections' },
    { value: 'projects', label: 'Projects' },
    { value: 'reviews', label: 'Reviews' },
  ]

  const handleTabsChange = (event, value) => {
    return router.push({ pathname: `/profile/[id]/[tab]` }, `/profile/${id}/${value}`)
  }

  return (
    <Page className={classes.root} title="Profile">
      <Header />
      <Container maxWidth="lg">
        {currentTab && (
          <Tabs onChange={handleTabsChange} scrollButtons="auto" value={currentTab} variant="scrollable">
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        )}
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {currentTab === 'timeline' && <Timeline />}
          {currentTab === 'connections' && <Connections />}
          {currentTab === 'projects' && <Projects />}
          {currentTab === 'reviews' && <Reviews />}
        </div>
      </Container>
    </Page>
  )
}

export default Profile
