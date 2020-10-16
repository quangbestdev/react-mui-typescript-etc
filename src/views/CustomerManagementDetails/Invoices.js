import React, { useState, useEffect } from 'react'
import RouterLink from 'next/link'
import clsx from 'clsx'
import moment from 'moment'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  colors,
} from '@material-ui/core'
import axios from '../../utils/axios'
import Label from '../../components/Label'
import GenericMoreButton from '../../components/GenericMoreButton'

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1150,
  },
}))

function Invoices({ className, ...rest }) {
  const classes = useStyles()
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    let mounted = true

    const fetchInvoices = () => {
      axios.get('/api/management/customers/1/invoices').then((response) => {
        if (mounted) {
          setInvoices(response.data.invoices)
        }
      })
    }

    fetchInvoices()

    return () => {
      mounted = false
    }
  }, [])

  const statusColors = {
    pending: colors.orange[600],
    paid: colors.green[600],
    rejected: colors.red[600],
  }

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="Customer invoices" />
        <Divider />
        <CardContent className={classes.content}>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>#{invoice.id.split('-').shift()}</TableCell>
                    <TableCell>{moment(invoice.date).format('DD/MM/YYYY | HH:MM')}</TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell>
                      {invoice.currency}
                      {invoice.value}
                    </TableCell>
                    <TableCell>
                      <Label color={statusColors[invoice.status]} variant="outlined">
                        {invoice.status}
                      </Label>
                    </TableCell>
                    <TableCell align="right">
                      <RouterLink href="/management/invoices/1" passHref>
                        <Button color="primary" component="a" size="small" variant="outlined">
                          View
                        </Button>
                      </RouterLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

Invoices.propTypes = {
  className: PropTypes.string,
}

export default Invoices
