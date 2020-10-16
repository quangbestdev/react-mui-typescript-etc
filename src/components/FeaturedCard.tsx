import React from 'react'
import Link from 'next/link'
import { BoxProps, Box, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { S3Image } from '@onextech/gvs-kit/core'

const useStyles = makeStyles<Theme, FeaturedCardProps>((theme) => ({
  root: {
    height: 370,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    textDecoration: 'none',
    cursor: 'pointer',
    [theme.breakpoints.only('xs')]: {
      height: 200,
    },
  },
  backgroundStyle: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    borderRadius: 10,
  },
  title: {
    position: 'absolute',
    top: theme.spacing(4),
    width: 330,
    color: ({ index }: FeaturedCardProps) =>
      index % 2 !== 0 ? theme.palette.text.contrast : theme.palette.text.primary,
    [theme.breakpoints.only('md')]: {
      width: 270,
    },
    [theme.breakpoints.only('sm')]: {
      width: 190,
    },
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
}))

interface FeaturedCardProps extends BoxProps {
  title: string
  image: string
  link: string
  category: string
  index: number
}

const FeaturedCard: React.FC<FeaturedCardProps> = (props) => {
  const { title, link, category, image } = props
  const classes = useStyles(props)

  const defaultTitle = 'Bon Bon Flavour of the Month: Singapore Gin-spired'
  const defaultCategory = 'Bon Bons'
  const defaultLink = '/shop'
  const defaultImage = '/home/choc_salted_egg_yolk.jpg'

  return (
    <Link href={{ pathname: `${link || defaultLink}`, query: { category: `${category || defaultCategory}` } }}>
      <Box component="a" className={classes.root}>
        {image ? (
          <S3Image className={classes.backgroundStyle} path={image} alt="Featured Product" />
        ) : (
          <img className={classes.backgroundStyle} src={defaultImage} alt="Featured Product" />
        )}
        <Typography className={classes.title} variant="h5">
          {title || defaultTitle}
        </Typography>
      </Box>
    </Link>
  )
}

export default FeaturedCard
