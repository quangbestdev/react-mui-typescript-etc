import { DiscountTypeEnum, UpdateEventInput } from '@onextech/etc-api'
import moment from 'moment'
import kebabCase from 'lodash/kebabCase'
import {
  emailOrderToCustomer,
  emailEventOrderToCustomer,
  emailOrderToAdmin,
  emailEventOrderToAdmin,
} from '@onextech/etc-kit/emails'
import { formatCurrency } from '../../utils/utils'
import config from '../../config'
import Mail from '../../mail/Mail'

const appConfig = config.app

// TODO: Calculate discount for specific products
export function getDiscountAmount(total, discount) {
  if (!discount) return 0
  const { value, type } = discount

  switch (type) {
    case DiscountTypeEnum.FIXED:
      return value
    case DiscountTypeEnum.PERCENTAGE:
      return total * (discount.value / 100)
    default:
      return 0
  }
}

// TODO: Apply 'applies only to specific products'
export function getIsDiscountValid(items, total, discount) {
  if (!discount) return false

  const {
    specificUsers,
    minTotalRequirement,
    minQuantityRequirement,
    redeemedCount,
    quantity,
    isOncePerUser,
    redeemedUsers,
    start,
    end,
  } = discount

  const userID = items?.[0]?.userID
  const totalQuantity = items.reduce((acc, { quantity }) => acc + quantity, 0)
  const now = moment()

  switch (true) {
    case now.isBefore(start):
    case now.isAfter(end):
    case redeemedCount && quantity && redeemedCount >= quantity:
    case specificUsers?.every(({ id }) => id !== userID):
    case isOncePerUser && redeemedUsers?.some(({ id }) => id === userID):
    case minTotalRequirement && total < minTotalRequirement:
    case minQuantityRequirement && totalQuantity < minQuantityRequirement:
      return false
    default:
      return true
  }
}

export function getDiscountValidationMessage(items, total, discount) {
  if (!discount) return 'Discount code is invalid'

  const {
    code,
    specificUsers,
    minTotalRequirement,
    minQuantityRequirement,
    redeemedCount,
    quantity,
    isOncePerUser,
    redeemedUsers,
    start,
    end,
  } = discount

  const userID = items?.[0]?.userID
  const totalQuantity = items.reduce((acc, { quantity }) => acc + quantity, 0)
  const now = moment()

  switch (true) {
    case now.isBefore(start):
      return 'This discount has yet started.'
    case now.isAfter(end):
      return 'This discount has expired.'
    case redeemedCount && quantity && redeemedCount >= quantity:
      return "There's no more discount left."
    case specificUsers?.every(({ id }) => id !== userID):
      return 'Sorry. You are not eligbile for this discount.'
    case isOncePerUser && redeemedUsers?.some(({ id }) => id === userID):
      return 'This discount can only be redeemed once per user.'
    case minTotalRequirement && total < minTotalRequirement:
      return `A minimum purchase of ${formatCurrency(minTotalRequirement)} is required.`
    case minQuantityRequirement && totalQuantity < minQuantityRequirement:
      return `There has to be a minimum of ${minQuantityRequirement} items in the cart.`
    default:
      return `${code} is applied!`
  }
}

export const isTicketsInStock = (totalSelectedQuantity, ticketList, values) => {
  if (!ticketList?.length) {
    return false
  }
  // Get stock count for the tickets (In ETC the stock count are same and together for Adult and Child)
  const stockCount = ticketList?.[0]?.stockCount ?? 10
  const selectedEventDate = values?.eventDate?.toISOString().slice(0, 10) ?? new Date().toISOString().slice(0, 10)

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

export const printEventDate = (eventDate) => {
  return eventDate?.toISOString().slice(0, 10) ?? new Date().toLocaleDateString()
}

/**
 * Get an ordered object for tickets.ordered.
 * @param tickets - The list of tickets of the event.
 * @param values - Key value pair of ticket title and quantity e.g (Adult (1400 - 1500), 3).
 */
export const getEventOrdered = (tickets: UpdateEventInput['tickets'], values) => {
  return tickets.reduce((acc, ticket) => {
    const ticketQuantity = values[`${ticket?.title} (${ticket?.timeslot})`]

    if (ticketQuantity && ticketQuantity > 0) {
      const newTicket = {
        title: ticket?.title,
        price: ticket?.price,
        quantity: ticketQuantity,
        eventDate: printEventDate(values?.eventDate),
        timeslot: ticket?.timeslot,
      }
      return acc.concat(newTicket)
    }

    return acc
  }, [])
}

/**
 * Get the total price of all tickets that were ordered.
 * @param tickets - The list of tickets of the event.
 * @param values - Key value pair of ticket title and quantity e.g (Adult (1400 - 1500), 3).
 */
export const getOrderedPrice = (tickets: UpdateEventInput['tickets'], values) => {
  const ticketPrices: number[] = tickets
    .filter((ticket) => Object.keys(values).includes(`${ticket?.title} (${ticket?.timeslot})`))
    .map((ticket) => ticket?.price * values[`${ticket?.title} (${ticket?.timeslot})`])

  return Number(ticketPrices.reduce((total, ticketPrice) => total + ticketPrice).toFixed(2))
}

/**
 * Get updated tickets with updated ticket.ordered.
 * @param tickets - The list of tickets of the event.
 * @param values - Key value pair of ticket title and quantity e.g (Adult (1400 - 1500), 3).
 * @param orderID - The ID of the current order.
 */
export const getUpdateTicketsOrdered = (
  values,
  tickets: UpdateEventInput['tickets'],
  orderID: string
): UpdateEventInput['tickets'] => {
  return tickets.map((ticket) => {
    const { ordered, title, timeslot } = ticket
    const quantity = values[`${title} (${timeslot})`]
    // If ticket has been updated and quantity is not 0
    if (quantity && quantity > 0) {
      const newOrder = {
        orderID,
        eventDate: printEventDate(values?.eventDate),
        quantity,
      }
      // If there is existing order in ordered array, concat new order
      return { ...ticket, ordered: ordered?.length ? ordered.concat(newOrder) : [newOrder] }
    }
    return ticket
  })
}

/**
 * Get an order.lines (with .event) for current order.
 * @param eventItem - Contains the event, tickets selected and values from ticket form
 */
export const getEventlines = (eventItem) => {
  return [
    {
      quantity: eventItem?.totalQuantity,
      event: {
        title: eventItem?.event?.title,
        slug: kebabCase(eventItem?.event?.title),
        subtitle: eventItem?.event?.subtitle,
        media: eventItem?.event?.media,
        start: eventItem?.event?.start,
        end: eventItem?.event?.end,
        ordered: getEventOrdered(eventItem?.event?.tickets, eventItem?.values),
      },
    },
  ]
}

/**
 * Get an order.lines (with .variant) for current order.
 * @param cartItems - Contains the products in the cart
 */
export const getLines = (cartItems) => {
  return cartItems.map(({ variant, quantity }) => {
    const { product } = variant
    const { merchant } = product
    return {
      quantity,
      variant: {
        id: variant.id,
        price: variant.price,
        media: variant.media,
        product: {
          id: product.id,
          title: product.title,
          slug: product.slug,
          media: product.media,
          merchant: {
            id: merchant.id,
            media: merchant.media,
          },
        },
      },
    }
  })
}

export const handleProductOrderEmail = (order, admins) => {
  // Email customer
  Mail.sendTransaction(emailOrderToCustomer(order, { appConfig }))
  // Email admin
  admins.map((admin) => {
    return Mail.sendTransaction(
      emailOrderToAdmin(order, admin, {
        appConfig: {
          ...appConfig,
          absoluteUrl: config.adminAbsoluteUrl,
        },
      })
    )
  })
}

export const handleEventOrderEmail = (order, admins) => {
  // Email customer
  Mail.sendTransaction(emailEventOrderToCustomer(order, { appConfig }))
  // Email admin
  admins.map((admin) => {
    return Mail.sendTransaction(
      emailEventOrderToAdmin(order, admin, {
        appConfig: {
          ...appConfig,
          absoluteUrl: config.adminAbsoluteUrl,
        },
      })
    )
  })
}
