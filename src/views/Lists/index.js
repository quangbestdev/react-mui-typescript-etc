import React from 'react'
import RouterLink from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Divider, Typography, Link, colors } from '@material-ui/core'
import Connections from '../Profile/Connections'
import Page from '../../components/Page'
import SimpleLists from './SimpleLists'
import DenseLists from './DenseLists'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300],
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  section: {
    '& + &': {
      marginTop: theme.spacing(5),
    },
  },
}))

function Lists() {
  const classes = useStyles()

  return (
    <Page className={classes.root} title="Lists">
      <Container maxWidth="lg">
        <Typography variant="overline">Components</Typography>
        <Typography gutterBottom variant="h3">
          Lists
        </Typography>
        <Divider className={classes.divider} />
        <div className={classes.section}>
          <Typography gutterBottom variant="h4">
            Simple Lists
          </Typography>
          <SimpleLists />
        </div>
        <div className={classes.section}>
          <Typography gutterBottom variant="h4">
            Dense Lists
          </Typography>
          <DenseLists />
        </div>
        <div className={classes.section}>
          <Typography gutterBottom variant="h4">
            Example
          </Typography>
          <Typography gutterBottom variant="subtitle2">
            Here is a complex example used in{' '}
            <RouterLink href="/profile/[id]/[tab]" as="/profile/1/connections" passHref>
              <Link component="a">Profile View</Link>
            </RouterLink>
          </Typography>
          <Connections />
        </div>
      </Container>
    </Page>
  )
}

export default Lists
