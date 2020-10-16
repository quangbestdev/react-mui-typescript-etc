import React from 'react'
import { Box, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/Layout/Layout'
import { BOOK_TICKETS_ONE, BOOK_TICKETS_TWO } from './mocks'
import BookTickets from './BookTickets'
import HeroBanner from './HeroBanner'
import Highlight from './Highlight'
import FactoryFeatures from './FactoryFeatures'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiBox-root header, footer': {
      margin: 0,
    },
  },
  block: {
    backgroundColor: theme.palette.common.white,
    padding: '100px 0px',
    [theme.breakpoints.down('xs')]: {
      padding: '60px 0px',
    },
  },
  bookTicketsDiscoverChoc: {
    backgroundColor: theme.palette.background.primary,
    [theme.breakpoints.up('md')]: {
      padding: '100px 0px 130px',
    },
  },
  bookTicketsFactoryMap: {
    backgroundColor: theme.palette.background.primary,
    [theme.breakpoints.up('md')]: {
      padding: '140px 0px 150px',
    },
  },
}))

const Visit: React.FC = (props) => {
  const classes = useStyles(props)

  return (
    <Layout title="Visit the Factory" className={classes.root}>
      {/* SECTION: Hero Banner */}
      <HeroBanner />

      {/* SECTION: Factory Tour Ticket Booking */}
      <Box className={classes.bookTicketsDiscoverChoc}>
        <BookTickets
          image={BOOK_TICKETS_ONE.image}
          cornerImage={BOOK_TICKETS_ONE.cornerImage}
          title={BOOK_TICKETS_ONE.title}
          description={BOOK_TICKETS_ONE.description}
          buttonText={BOOK_TICKETS_ONE.buttonText}
        />
      </Box>

      {/* SECTION: Factory Tour Features */}
      <Box className={classes.block}>
        <FactoryFeatures />
      </Box>

      {/* SECTION: Factory Map Location */}
      <Box className={classes.bookTicketsFactoryMap}>
        <BookTickets
          image={BOOK_TICKETS_TWO.image}
          cornerImage={BOOK_TICKETS_TWO.cornerImage}
          title={BOOK_TICKETS_TWO.title}
          description={BOOK_TICKETS_TWO.description}
          buttonText={BOOK_TICKETS_TWO.buttonText}
        />
      </Box>

      {/* SECTION: Bottom Banner */}
      <Box className={classes.block}>
        <Highlight />
      </Box>
    </Layout>
  )
}

export default Visit
