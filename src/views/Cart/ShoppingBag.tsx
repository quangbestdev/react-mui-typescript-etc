import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Typography, IconButton, Box, Hidden, TextField } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { S3Image } from '@onextech/gvs-kit/core'
import { formatCurrency } from '../../utils/utils'
import NumberStepper from '../../components/Form/NumberField/NumberStepper'
import { CartItemInterface } from '../../graphql/cart'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: 0,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  wrapper: {
    background: theme.palette.background.paper,
    padding: theme.spacing(4.5),
    width: 'auto',
    borderRadius: 10,
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3.5),
    },
  },
  row: {
    marginBottom: theme.spacing(2.5),
  },
  topGridItem: {
    display: 'flex',
    alignItems: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
    },
    '& > img': {
      objectFit: 'cover',
      width: 60,
      height: 60,
      [theme.breakpoints.up('md')]: {
        width: 80,
        height: 80,
      },
    },
  },
  headline: {
    textTransform: 'uppercase',
    fontWeight: 700,
    letterSpacing: 1,
    color: theme.palette.text.hint,
  },
  gridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    marginBottom: theme.spacing(1),
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 600,
    lineHeight: 1,
  },
  subtitle: {
    color: theme.palette.text.hint,
  },
  cost: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 600,
  },
  numberStepperGridItem: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-end',
    },
  },
  deleteIcon: {
    color: theme.palette.text.hint,
  },
}))

interface ShoppingBagProps {
  cartItems: CartItemInterface[]
  selected?: CartItemInterface[]
  handleSelect?: (item: CartItemInterface, isSelcted: boolean) => void
  handleChange?: (index: CartItemInterface) => (quantity: number) => void
  handleDelete?: (index: CartItemInterface) => void
  handleSelectAll?: () => void
}

const ShoppingBag: React.FC<ShoppingBagProps> = (props) => {
  const classes = useStyles()
  const { cartItems, handleDelete, handleChange } = props

  return (
    <Container className={classes.container}>
      <Box className={classes.wrapper}>
        <Hidden xsDown>
          <Grid container className={classes.row}>
            <Grid item xs={4} sm={2} className={classes.topGridItem}>
              <Typography variant="subtitle1" className={classes.headline}>
                Items
              </Typography>
            </Grid>
            <Grid item container xs={8} sm={10}>
              <Grid item sm={6} />
              <Grid item xs={3} sm={2} className={classes.gridItem}>
                <Typography variant="subtitle1" className={classes.headline}>
                  Price
                </Typography>
              </Grid>
              <Grid item xs={3} sm={3} className={classes.gridItem}>
                <Typography variant="subtitle1" className={classes.headline}>
                  Quantity
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>

        {cartItems.map((cartItem) => {
          const { quantity } = cartItem
          const title = cartItem.variant?.product?.title
          const subtitle = cartItem.variant?.title
          const image = cartItem.variant?.product?.media?.[0]?.src
          const price = cartItem.variant?.price
          return (
            <Grid container className={classes.row} key={cartItem.id}>
              <Grid item xs={3} sm={2} className={classes.topGridItem}>
                <S3Image src={image} className={classes.image} />
              </Grid>
              <Grid item container xs={9} sm={10}>
                <Grid item xs={12} sm={6} className={classes.titleWrapper}>
                  <Typography className={classes.title}>{title}</Typography>
                  <Typography variant="subtitle2" className={classes.subtitle}>
                    {subtitle !== 'Primary' && subtitle}
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={2} className={classes.gridItem}>
                  <Typography className={classes.cost}>{formatCurrency(price)}</Typography>
                </Grid>
                <Grid item xs={7} sm={3} className={clsx(classes.gridItem, classes.numberStepperGridItem)}>
                  <NumberStepper onChange={handleChange(cartItem)} value={quantity} min={1} />
                </Grid>
                <Grid item xs={2} sm={1} className={classes.gridItem}>
                  <IconButton key="close" onClick={() => handleDelete(cartItem)}>
                    <DeleteOutlineIcon className={classes.deleteIcon} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Box>
    </Container>
  )
}

export default ShoppingBag
