/**
 * Get total quantity of all tickets field
 * @param values - Key value pair of ticket title and quantity e.g (Adult (1400 - 1500), 3).
 */
export const getTotalQuantity = (values) => {
  // Get the quantity from the Adult and Child ticket
  const quantities = Object.keys(values).map((key) => {
    if (key === 'eventDate' || key === 'errorField') {
      return 0
    }
    return values[key]
  })

  // Calculate total quantity
  return quantities.reduce((totalQuantity, quantity) => totalQuantity + quantity, 0)
}

export const printEventDate = (eventDate) => {
  return eventDate?.toISOString().slice(0, 10) ?? new Date().toLocaleDateString()
}

export const isTicketsInStock = (totalSelectedQuantity: number, ticketList, values) => {
  if (!ticketList?.length) {
    return false
  }
  // Get stock count for the tickets (In ETC the stock count are same and together for Adult and Child)
  const stockCount = ticketList?.[0]?.stockCount ?? 0
  const selectedEventDate = printEventDate(values?.eventDate)

  // Iterate through ticket.ordered, filter by selected date and get ordered ticket's quantity
  const quantities: number[] = ticketList.flatMap((ticket) => {
    return (
      ticket?.ordered
        ?.filter((order) => order?.eventDate === selectedEventDate)
        .map((order) => {
          return order?.quantity
        }) || 0
    )
  })

  const totalOrderedQuantity =
    quantities && quantities.length ? quantities?.reduce((total, quantity) => total + quantity) : 0

  // Minus stockCount with current total selected quantity and ordered quantity
  const stockLeft = stockCount - totalSelectedQuantity - totalOrderedQuantity

  // If stockLeft is 0 or more means got stock left
  return stockLeft >= 0
}

export const getTimeslotsFromTickets = (tickets, selectedDay) => {
  // Get timeslot in the ticket title parenthesis
  return tickets.reduce((timeslots, { timeslot, availableDays }) => {
    if (timeslot && availableDays?.includes(selectedDay)) {
      return timeslots.concat(timeslot)
    }
    return timeslots
  }, [])
}
