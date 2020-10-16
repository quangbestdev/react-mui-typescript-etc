import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { colors, Container, Divider, Tab, Tabs } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Page from '../../../components/Page'
import Header from './Header'
import Summary from './Summary'
import { withApollo } from '../../../withApollo'
import { getTodo as GET_TODO } from '../../../graphql/queries'

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

function TodoManagementDetails() {
  const classes = useStyles()

  const router = useRouter()
  const { id, tab: currentTab } = router.query

  const tabs = [{ value: 'summary', label: 'Summary' }]

  const handleTabsChange = (event, value) => {
    return router.push({ pathname: `/management/todos/[id]/[tab]` }, `/management/todos/${id}/${value}`)
  }

  const getTodoQuery = {
    query: gql(GET_TODO),
    variables: { id: router.query.id },
  }

  const { loading, data = {} } = useQuery(getTodoQuery.query, {
    variables: getTodoQuery.variables,
  })

  const { getTodo: todo } = data

  return (
    <Page className={classes.root} title="Todo Management Details">
      <Container maxWidth={false}>
        {todo && <Header todo={todo} />}
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
        <div className={classes.content}>{currentTab === 'summary' && todo && <Summary todo={todo} />}</div>
      </Container>
    </Page>
  )
}

export default withApollo()(TodoManagementDetails)
