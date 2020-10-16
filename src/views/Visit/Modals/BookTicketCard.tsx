import React, { useState, useEffect, useMemo } from 'react'
import moment from 'moment'
import { Button, Typography, Box, Grid, TextField } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Autocomplete } from '@material-ui/lab'
import { Controller, useForm, FieldError } from 'react-hook-form'
import { S3Image } from '@onextech/gvs-kit/core'
import { DatePicker, DatePickerProps } from '@material-ui/pickers'
import { UpdateEventInput, ListEventsQuery } from '@onextech/etc-api'
import NumberStepper from '../../../components/Form/NumberField/NumberStepper'
import { useListEvents, EventInterface } from '../../../graphql/event'
import { useAuth } from '../../../auth'
import config from '../../../config'
import { getTotalQuantity, isTicketsInStock, getTimeslotsFromTickets } from '../utils'
import Loading from '../../../components/Loading'

const getDefaultEventDate = (availableDays: Set<number>) => {
  const defaultEventDateMoment = [...new Array(7)]
    .map((_, i) => moment().add(i, 'days'))
    .find((date) => availableDays.has(date.day()))
  return defaultEventDateMoment || null
}

const useStyles = makeStyles((theme) => ({
  // Temporary fix to solve large options font
  '@global': {
    '.MuiAutocomplete-option': {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  root: {
    padding: theme.spacing(8, 7),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
    },
  },
  image: {
    width: '100%',
  },
  price: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 600,
  },
  listTitle: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 600,
  },
  bulletPointsWrapper: {
    marginTop: theme.spacing(0.5),
  },
  fieldsWrapper: {
    paddingRight: theme.spacing(15),
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(0),
    },
  },
  selectorTitle: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(1.5),
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 600,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  selectorWrapper: {
    '& .MuiInputBase-input': {
      fontSize: theme.typography.pxToRem(16),
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 4,
    },
    '& .MuiInputLabel-root': {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  stepperWrapper: {
    marginTop: theme.spacing(1.5),
  },
  footer: {
    marginBottom: theme.spacing(3),
    fontStyle: 'italic',
  },
  buyButton: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.25, 4),
  },
  cartButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1.25, 2.5),
    '& .MuiSvgIcon-root': {
      color: theme.palette.text.hint,
    },
  },
  errorField: {
    border: 'transparent',
    '& > .MuiInput-underline.Mui-disabled:before, .MuiInput-underline.Mui-error:after': {
      border: 'transparent',
    },
  },
  errorFieldInput: {
    display: 'none',
  },
  error: {
    margin: theme.spacing(0, 0, 2),
    color: theme.palette.error.main,
  },
}))

interface BookTicketFormValues {
  eventDate: any
  errorField: string
}

interface EventItemInterface {
  event: EventInterface
  selectedTickets: UpdateEventInput['tickets']
  totalQuantity: number
  values: BookTicketFormValues
}

interface BookTicketCardProps {
  eventItem: EventItemInterface
  handleNextView?: (string) => void
  handleUpdateEventItem?: (EventItemInterface) => void
}

interface DatePickerAdapterProps extends Omit<DatePickerProps, 'value'> {
  availableDays?: Set<number>
  value?: object | string
}

const DatePickerAdapter: React.FC<DatePickerAdapterProps> = (props) => {
  const classes = useStyles()
  const { value, onChange, availableDays } = props

  return (
    <DatePicker
      autoOk
      value={value}
      onChange={onChange}
      fullWidth
      className={classes.selectorWrapper}
      inputVariant="outlined"
      format="DD/MM/YY"
      minDate={new Date()}
      shouldDisableDate={(date) => !availableDays.has(date.day())}
    />
  )
}

const getTimeslotsBySelectedDay = (tickets, selectedDay) => {
  if (!Array.isArray(tickets) || !selectedDay) return []

  return getTimeslotsFromTickets(tickets, selectedDay)
    .filter((value, index, array) => array.indexOf(value) === index)
    ?.sort()
}

const BookTicketCard: React.FC<BookTicketCardProps> = (props) => {
  const { eventItem, handleNextView, handleUpdateEventItem } = props
  const { event: prevEvent, selectedTickets, values: prevValues } = eventItem || {}

  const classes = useStyles()
  const { user, openLoginModal } = useAuth()

  // TODO: Get event by event key field (need update schema)
  const { events, loading } = useListEvents({
    variables: {
      filter: {
        key: {
          eq: config.eventKey,
        },
      },
    },
  })
  const event = loading ? (prevEvent as ListEventsQuery['listEvents']['items'][number]) : events[0]
  const availableDays = new Set(
    event?.tickets?.reduce((arr, { availableDays }) => (!availableDays ? arr : arr.concat(availableDays)), [])
  )

  const defaultEventDate = useMemo(() => getDefaultEventDate(availableDays), [event])

  const defaultValues = {
    ...prevValues,
    errorField: null,
    eventDate: prevValues?.eventDate || defaultEventDate,
  }

  const { setError, clearError, control, handleSubmit, formState, watch, errors, setValue } = useForm<
    BookTicketFormValues
  >({
    defaultValues,
  })
  const { isSubmitting } = formState
  const values = watch()

  const eventDate = watch('eventDate')
  const timeSlots = getTimeslotsBySelectedDay(event?.tickets, eventDate?.day())?.sort() || []

  // TODO: Refactor and move these states into form to keep form as single source of truth
  const [timeSlot, setTimeSlot] = useState(selectedTickets?.[0]?.timeslot || null)
  const [ticketList, setTicketList] = useState(selectedTickets || [])

  const onSubmit = () => {
    if (!user?.id) {
      return openLoginModal()
    }
    const stockCount = ticketList?.[0]?.stockCount ?? 0
    const totalQuantity = getTotalQuantity(values)

    if (totalQuantity > stockCount) {
      return setError('errorField', 'exceeded', `Total quantity cannot exceed ${stockCount}`)
    }

    if (totalQuantity < 1) {
      return setError('errorField', 'zero', 'Total quantity cannot be zero')
    }

    if (!isTicketsInStock(totalQuantity, ticketList, values)) {
      return setError('errorField', 'outofstock', 'Sorry, tickets are out of stock')
    }

    clearError('errorField')

    const eventItem = {
      values,
      selectedTickets: ticketList,
      event,
      totalQuantity,
    }

    if (handleUpdateEventItem) handleUpdateEventItem(eventItem)
    if (handleNextView) handleNextView('CUSTOMER_DETAILS')
  }

  const handleEventDateChange = ([value]) => {
    setTimeSlot(null)
    setTicketList([])

    return value
  }

  const handleTimeslotChange = (e, values) => {
    const tickets = event?.tickets?.filter((ticket) => ticket?.timeslot === values)
    setTimeSlot(values)
    setTicketList(tickets)
  }

  useEffect(() => {
    if (!eventDate && defaultEventDate) {
      setValue('eventDate', defaultEventDate)
    }
    if (!timeSlot && timeSlots?.length) {
      const [defaultTimeSlot] = timeSlots
      setTimeSlot(defaultTimeSlot)
      const defaultTickets = event?.tickets?.filter((ticket) => ticket?.timeslot === defaultTimeSlot)
      setTicketList(defaultTickets)
    }
  })

  if (loading) {
    return <Loading />
  }

  return (
    <>
      {event && (
        <Box className={classes.root}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={5}>
                <S3Image className={classes.image} path={event.media?.[0]?.src} />
              </Grid>
              <Grid item xs={12} sm={7}>
                <Typography variant="h4">{event.title}</Typography>
                <Typography className={classes.price}>{event.subtitle}</Typography>
                <Typography className={classes.listTitle}>Includes</Typography>
                <Box className={classes.bulletPointsWrapper}>
                  {event.features?.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </Box>
                <Box className={classes.fieldsWrapper}>
                  <Typography className={classes.selectorTitle}>Tour Date</Typography>
                  <Controller
                    as={DatePickerAdapter}
                    control={control}
                    name="eventDate"
                    availableDays={availableDays}
                    onChange={handleEventDateChange}
                  />
                  {Boolean(timeSlots?.length) && (
                    <>
                      <Typography className={classes.selectorTitle}>Tour Timeslot</Typography>
                      <Autocomplete
                        className={classes.selectorWrapper}
                        id="time-selector"
                        options={timeSlots}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            defaultValue="Select Timeslot"
                            placeholder="Select Timeslot"
                          />
                        )}
                        onChange={handleTimeslotChange}
                        value={timeSlot}
                        disableClearable
                      />
                    </>
                  )}
                  {Boolean(ticketList?.length) &&
                    ticketList.map((ticket) => {
                      const isChildTicket = ticket?.title?.toLowerCase()?.includes('child')

                      if (isChildTicket) return null

                      return (
                        <Box key={ticket?.id}>
                          <Typography className={classes.selectorTitle}>
                            {`${ticket?.title} (${ticket?.timeslot})`}
                          </Typography>
                          <Controller
                            name={`${ticket?.title} (${ticket?.timeslot})`}
                            as={NumberStepper}
                            control={control}
                            min={0}
                            max={ticket?.stockCount}
                          />
                        </Box>
                      )
                    })}
                  <Controller
                    as={
                      <TextField InputProps={{ className: classes.errorFieldInput }} className={classes.errorField} />
                    }
                    control={control}
                    name="errorField"
                    error={errors.errorField}
                    helperText={(errors.errorField as FieldError)?.message}
                    fullWidth
                    disabled
                  />
                  <Typography variant="subtitle2" className={classes.footer}>
                    Children 12 & under do not need a ticket
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buyButton}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}
    </>
  )
}

export default BookTicketCard
