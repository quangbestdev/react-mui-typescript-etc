import React from 'react'
import { Box, Container, Divider, Typography, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from './ExpansionPanel'
import Layout from '../../components/Layout/Layout'
import { orderFAQs, productFAQs, returnFAQs, skinFAQs } from './constants'

const useStyles = makeStyles((theme: Theme) => {
  return {
    background: {
      height: '100%',
      width: '100%',
      background: theme.palette.background.default,
      paddingBottom: theme.spacing(5),
    },
    header: {
      marginBottom: theme.spacing(1.5),
    },
    subHeader: {
      fontWeight: 400,
      marginBottom: theme.spacing(5.5),
    },
    headerWrapper: {
      marginTop: 80,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(0.625)
      },
    },
    mobileTextWrapper: {
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(5),
        maxWidth: '100%',
      },
    },
    image: {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
      maxWidth: 565,
    },
    faqsWrapper: {
      marginTop: theme.spacing(10),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(0.625),
      },
    },
    faqHeader: {
      paddingLeft: theme.spacing(3),
      textTransform: 'uppercase',
      marginBottom: theme.spacing(5),
      color: theme.palette.secondary.light,
      letterSpacing: 1,
    },
    divider: {
      margin: theme.spacing(5, 0),
    },
  }
})

const FAQs: React.FC = () => {
  const classes = useStyles()

  return (
    <Layout title="FAQs">
      <Box className={classes.background}>
        {/* Header */}
        <Container className={classes.headerWrapper}>
          <Box maxWidth={910} className={classes.mobileTextWrapper}>
            <Typography variant="h2" className={classes.header}>
              Frequently Asked Questions
            </Typography>
            <Typography variant="h6" className={classes.subHeader}>
              Have questions about products, orders or your skin quiz? We’re here to help.
            </Typography>
            <img src="/faqs/liquid-make-up.png" alt="liquid-make-up" className={classes.image} />
          </Box>
        </Container>

        {/* FAQs */}
        <Container className={classes.faqsWrapper}>
          <Box maxWidth={910}>
            <Typography variant="h6" className={classes.faqHeader}>
              Order & Shipping
            </Typography>
            {orderFAQs.map((item) => {
              const { question, answer } = item
              return <ExpansionPanel key={question} header={question} details={answer} />
            })}
            <Divider className={classes.divider} />

            <Typography variant="h6" className={classes.faqHeader}>
              Products
            </Typography>
            {productFAQs.map((item) => {
              const { question, answer } = item
              return <ExpansionPanel key={question} header={question} details={answer} />
            })}
            <Divider className={classes.divider} />

            <Typography variant="h6" className={classes.faqHeader}>
              Returns And Exchanges
            </Typography>
            {returnFAQs.map((item) => {
              const { question, answer } = item
              return <ExpansionPanel key={question} header={question} details={answer} />
            })}
            <Divider className={classes.divider} />

            <Typography variant="h6" className={classes.faqHeader}>
              Skin Quiz
            </Typography>
            {skinFAQs.map((item) => {
              const { question, answer } = item
              return <ExpansionPanel key={question} header={question} details={answer} />
            })}
            <Divider className={classes.divider} />
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default FAQs
