import React from 'react'
import { Container, Grid, GridProps, Typography, Theme } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

interface SplitBannerStyles {
  reverse: boolean
}

export interface SplitBannerProps extends GridProps {
  title: string
  content: string
  image: string
  reverse?: boolean
}

const useStyles = makeStyles<Theme, SplitBannerStyles>((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: ({ reverse }) => (reverse ? 'row-reverse' : 'row'),
    },
  },
  contentWrapper: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.only('sm')]: {
      padding: theme.spacing(4, 0),
    },
    [theme.breakpoints.only('xs')]: {
      padding: theme.spacing(4, 2),
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(36),
    fontWeight: 800,
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1.5),
    color: theme.palette.primary.main,
    [theme.breakpoints.only('xs')]: {
      fontSize: theme.typography.pxToRem(28),
      textAlign: 'center',
    },
  },
  content: {
    fontSize: theme.typography.pxToRem(18),
    lineHeight: 1.6,
    color: theme.palette.primary.main,
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  imageWrapper: {
    display: 'flex',
  },
  image: {
    maxWidth: '100%',
    objectFit: 'cover',
  },
}))

const SplitBanner: React.FC<SplitBannerProps> = (props) => {
  const { title, content, image, reverse = false, ...rest } = props
  const classes = useStyles({ reverse })

  return (
    <Grid container className={classes.root} {...rest}>
      <Grid className={classes.imageWrapper} item xs={12} sm={4} md={6}>
        <img className={classes.image} src={image} alt={title} />
      </Grid>
      <Grid className={classes.contentWrapper} item xs={12} sm={8} md={6}>
        <Container maxWidth="xs">
          {/* Title */}
          <Typography className={classes.title} variant="h4">
            {title}
          </Typography>
          {/* Content */}
          <Typography className={classes.content} variant="body1">
            {content}
          </Typography>
        </Container>
      </Grid>
    </Grid>
  )
}

export default SplitBanner
