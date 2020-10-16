import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Theme } from '@material-ui/core'
import { S3Image } from '@onextech/gvs-kit/core'
import { formatCurrency } from '../../../../utils/utils'
import { OrderLineType } from '../../../../graphql/order'

type OrderEventRowsType = {
  // media does not exist in product in OrderLineType
  item: OrderLineType | any
}

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
    },
  },
  costTitleWrapper: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  costTitle: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  costWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.only('xs')]: {
      justifyContent: 'center',
    },
  },
  cost: {
    textAlign: 'center',
    fontWeight: 600,
    color: theme.palette.text.secondary,
  },
  leftGridItem: {
    display: 'flex',
    alignItems: 'center',
  },
  gridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.only('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.only('xs')]: {
      marginBottom: theme.spacing(1),
      '& .MuiTypography-root': {
        textAlign: 'center',
        fontWeight: 700,
      },
    },
  },
  image: {
    borderRadius: 10,
    maxWidth: 120,
    [theme.breakpoints.only('xs')]: {
      maxWidth: '100%',
      objectFit: 'cover',
      marginBottom: theme.spacing(1),
    },
  },
}))

const OrderEventRows: React.FC<OrderEventRowsType> = (props) => {
  const classes = useStyles()
  const { item } = props
  const { event } = item

  return (
    <>
      {event?.ordered?.length &&
        event.ordered.map((order) => (
          <Grid container key={order.title} className={classes.row}>
            <Grid item xs={12} md={2} className={classes.leftGridItem}>
              <S3Image src={event.media?.[0]?.src} className={classes.image} />
            </Grid>
            <Grid item xs={12} md={6} className={classes.titleWrapper}>
              <Typography color="textSecondary">{event.title}</Typography>
              <Typography color="textSecondary" variant="subtitle2">
                {`${order.title} (${order.timeslot}), ${order.eventDate}`}
              </Typography>
            </Grid>
            <Grid item xs={12} md={2} className={classes.gridItem}>
              <Grid container>
                <Grid className={classes.costTitleWrapper} item xs={12}>
                  <Typography className={classes.costTitle}>Price: </Typography>
                </Grid>
                <Grid className={classes.costWrapper} item xs={12}>
                  <Typography className={classes.cost}>{formatCurrency(order.price)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2} className={classes.gridItem}>
              <Grid container>
                <Grid className={classes.costTitleWrapper} item xs={12}>
                  <Typography className={classes.costTitle}>Quantity: </Typography>
                </Grid>
                <Grid className={classes.costWrapper} item xs={12}>
                  <Typography className={classes.cost}>{order.quantity}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </>
  )
}

export default OrderEventRows
