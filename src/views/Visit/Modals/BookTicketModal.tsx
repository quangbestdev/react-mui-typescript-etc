import React, { useState } from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Button } from '@material-ui/core'
import PortalModal from '../../../components/PortalModal'
import BookTicketCard from './BookTicketCard'
import BookTicketSuccess from './BookTicketSuccess'
import CustomerDetailsForm from '../../Checkout/CustomerDetailsForm'
import PaymentDetailsFormWrapper from '../../Checkout/PaymentDetailsForm'
import { DiscountInterface } from '../../../graphql/discount/typings'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
    boxShadow: theme.shadows[0],
    '& .MuiDivider-root': {
      display: 'none',
    },
    '& .MuiCardContent-root': {
      padding: 0,
    },
    [theme.breakpoints.down('xs')]: {
      width: 350,
    },
  },
  backButton: {
    padding: theme.spacing(1.5),
    color: theme.palette.secondary.dark,
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.dark,
    },
  },
}))

const EVENT_VIEWS = { TICKETS: 'TICKETS', CUSTOMER_DETAILS: 'CUSTOMER_DETAILS', PAYMENT: 'PAYMENT', SUCCESS: 'SUCCESS' }

type BookTicketModalProps = React.ComponentProps<typeof PortalModal>

const BookTicketModal: React.FC<BookTicketModalProps> = (props) => {
  const classes = useStyles()
  const [view, setView] = useState(EVENT_VIEWS.TICKETS)
  const [eventItem, setEventItem] = useState(null)
  const [discount, setDiscount] = useState<DiscountInterface>()

  const [billingDetails, setBillingDetails] = useState(null)

  const isShowBackButton = view === EVENT_VIEWS.CUSTOMER_DETAILS || view === EVENT_VIEWS.PAYMENT

  const onSuccess = () => {
    setView(EVENT_VIEWS.SUCCESS)
  }

  const handleUpdateBillingDetail = (billingDetails) => {
    setView(EVENT_VIEWS.PAYMENT)
    setBillingDetails(billingDetails)
  }

  const handleTicketOutOfStock = () => {
    setView(EVENT_VIEWS.TICKETS)
  }

  const handleUpdateEventItem = (eventItem) => {
    setEventItem(eventItem)
  }

  const renderView = (view) => {
    switch (view) {
      case EVENT_VIEWS.TICKETS:
        return (
          <BookTicketCard
            eventItem={eventItem}
            handleUpdateEventItem={handleUpdateEventItem}
            handleNextView={setView}
          />
        )
      case EVENT_VIEWS.CUSTOMER_DETAILS:
        return <CustomerDetailsForm isEvent handleUpdateBillingDetail={handleUpdateBillingDetail} />
      case EVENT_VIEWS.PAYMENT:
        return (
          <PaymentDetailsFormWrapper
            eventItem={eventItem}
            billingDetails={billingDetails}
            discount={discount}
            handleTicketOutOfStock={handleTicketOutOfStock}
            onSuccess={onSuccess}
          />
        )
      case EVENT_VIEWS.SUCCESS:
        return <BookTicketSuccess />
      default:
        return (
          <BookTicketCard
            eventItem={eventItem}
            handleUpdateEventItem={handleUpdateEventItem}
            handleNextView={setView}
          />
        )
    }
  }

  const handleClickBack = (view) => {
    switch (view) {
      case EVENT_VIEWS.CUSTOMER_DETAILS:
        return setView(EVENT_VIEWS.TICKETS)
      case EVENT_VIEWS.PAYMENT:
        return setView(EVENT_VIEWS.CUSTOMER_DETAILS)
      default:
        setView(view)
    }
  }

  const [isShown, setIsShown] = useState(false)
  const show = () => setIsShown(true)
  const hide = () => {
    setIsShown(false)
    setEventItem(null)
  }

  const { toggle, ...rest } = props

  return (
    <>
      {toggle(show)}
      <PortalModal width={900} className={classes.root} open={isShown} close={hide} {...rest}>
        {isShowBackButton && (
          <Button
            className={classes.backButton}
            startIcon={<ChevronLeftIcon />}
            onClick={() => {
              handleClickBack(view)
            }}
          >
            Back
          </Button>
        )}
        {renderView(view)}
      </PortalModal>
    </>
  )
}

export default BookTicketModal
