import React from 'react'
import Link from 'next/link'
import { Box, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { S3Image } from '@onextech/gvs-kit/core'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.common.white,
    borderRadius: '0 0 10px 10px',
  },
  image: {
    borderRadius: '10px 10px 0 0',
    objectFit: 'cover',
    maxHeight: 220,
    [theme.breakpoints.only('xs')]: {
      maxHeight: 150,
    },
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3, 2, 4),
  },
  title: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 800,
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },
  category: {
    maxWidth: 215,
    textAlign: 'center',
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.light,
    [theme.breakpoints.only('xs')]: {
      marginBottom: theme.spacing(1),
    },
    [theme.breakpoints.up('sm')]: {
      minHeight: 50,
    },
  },
  price: {
    color: theme.palette.text.tertiary,
    fontWeight: 800,
  },
}))

interface NewArrivalCardProps {
  title: string
  category: string
  image: string
  price: number
  slug: string
}

const NewArrivalCard: React.FC<NewArrivalCardProps> = (props) => {
  const { title, category, image, price, slug } = props
  const classes = useStyles(props)

  return (
    <Link href="/shop/[slug]" as={`/shop/${slug}`} passHref>
      <Box component="a" className={classes.root}>
        <S3Image className={classes.image} src={image} alt={title} />
        <Box className={classes.contentWrapper}>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body2" className={classes.category}>
            {category}
          </Typography>
          <Typography variant="subtitle1" className={classes.price}>
            ${price.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Link>
  )
}

export default NewArrivalCard
