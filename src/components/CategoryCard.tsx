import React from 'react'
import Link from 'next/link'
import { Theme, Typography, Card, CardMedia, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// TODO: Link to products page with pre-applied filters based on selection

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: 10,
    boxShadow: 'none',
  },
  cardMedia: {
    height: 210,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.only('xs')]: {
      height: 150,
    },
  },
  cardContent: {
    background: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > :not(:first-child)': {
      marginTop: theme.spacing(1),
    },
  },
  title: {
    color: theme.palette.common.white,
    fontWeight: 700,
  },
  subcategory: {
    textDecoration: 'none',
    color: theme.palette.common.white,
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

interface SubCategory {
  title: string
  link: string
}

interface CategoryCardProps {
  title: string
  image: string
  subcategories?: SubCategory[]
}

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const { title, image, subcategories } = props
  const classes = useStyles(props)

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMedia} image={image} title={title}>
        <Typography variant="body2" className={classes.title}>
          {title}
        </Typography>
      </CardMedia>
      <CardContent className={classes.cardContent}>
        {subcategories &&
          subcategories.map((subcategory) => (
            <Link href={subcategory.link} passHref>
              <Typography component="a" variant="body2" className={classes.subcategory}>
                {subcategory.title}
              </Typography>
            </Link>
          ))}
      </CardContent>
    </Card>
  )
}

export default CategoryCard
