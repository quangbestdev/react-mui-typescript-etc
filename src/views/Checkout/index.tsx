import React, { useState, useEffect } from 'react'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Router from 'next/router'
import Layout from '../../components/Layout/Layout'
import CustomerDetailsForm from './CustomerDetailsForm'
import PaymentDetailsForm from './PaymentDetailsForm'
import OrderSummarySection from './OrderSummarySection'
import { DiscountInterface } from '../../graphql/discount/typings'

const useStyles = makeStyles((theme) => ({
  wrapper: { background: theme.palette.background.default },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(5),
  },
  header: {
    color: theme.palette.text.primary,
    margin: theme.spacing(3.75, 0),
  },
}))

const Checkout: React.FC = (props) => {
  const classes = useStyles(props)

  const [billingDetails, setBillingDetails] = useState(null)
  const [customerFormSubmitted, setSubmitCustomerForm] = useState(false)

  const handleUpdateBillingDetail = (billingDetails) => {
    setSubmitCustomerForm(true)
    setBillingDetails(billingDetails)
  }

  const onSuccess = () => {
    Router.push('/order/success')
  }

  // Store Discount state
  const [discounts, setDiscounts] = useState<DiscountInterface[]>([])

  return (
    <Layout title="Checkout">
      <Box className={classes.wrapper}>
        <Container maxWidth="lg">
          <Typography variant="h3" className={classes.header}>
            {customerFormSubmitted ? 'Payment Details' : 'Customer Details'}
          </Typography>

          <Grid container spacing={3} className={classes.contentWrapper}>
            <Grid item xs={12} md={8}>
              {customerFormSubmitted ? (
                <PaymentDetailsForm billingDetails={billingDetails} discounts={discounts} onSuccess={onSuccess} />
              ) : (
                <CustomerDetailsForm handleUpdateBillingDetail={handleUpdateBillingDetail} />
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <OrderSummarySection onSubmitDiscounts={setDiscounts} discounts={discounts} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}

export default Checkout
