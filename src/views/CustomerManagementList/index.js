import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import axios from '../../utils/axios'
import Page from '../../components/Page'
import SearchBar from '../../components/SearchBar'
import Header from './Header'
import Results from './Results'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  results: {
    marginTop: theme.spacing(3),
  },
}))

function CustomerManagementList() {
  const classes = useStyles()
  const [customers, setCustomers] = useState([])

  const handleFilter = () => {}

  const handleSearch = () => {}

  useEffect(() => {
    let mounted = true

    const fetchCustomers = () => {
      axios.get('/api/management/customers').then((response) => {
        if (mounted) {
          setCustomers(response.data.customers)
        }
      })
    }

    fetchCustomers()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <Page className={classes.root} title="Customer Management List">
      <Container maxWidth={false}>
        <Header />
        <SearchBar onFilter={handleFilter} onSearch={handleSearch} />
        {customers && <Results className={classes.results} customers={customers} />}
      </Container>
    </Page>
  )
}

export default CustomerManagementList
