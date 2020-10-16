import React from 'react'
import Link from 'next/link'
import { Box, Button, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { S3Image } from '@onextech/gvs-kit/core'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 570,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      height: 450,
      justifyContent: 'center',
    },
  },
  backgroundStyle: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  contentWrapper: {
    width: 340,
    position: 'absolute',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      left: theme.spacing(20),
      textAlign: 'left',
    },
  },
  subtitle: {
    color: theme.palette.text.contrast,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
  },
  button: {
    padding: theme.spacing(1, 6),
  },
}))

const HeroBanner = (props) => {
  const { advertisement } = props
  const { title, subtitle, media, link } = advertisement || {}

  const defaultTitle = 'Chocolate Gift Box'
  const defaultSubtitle =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. The industry's standard dummy text."
  const defaultLink = '/shop'
  const defaultImage = '/home/chocolates_box.jpg'

  const classes = useStyles(props)

  return (
    <>
      <Box className={classes.root}>
        {media?.[0].src ? (
          <S3Image className={classes.backgroundStyle} path={media?.[0].src} alt="Advertisement Banner" />
        ) : (
          <img className={classes.backgroundStyle} src={defaultImage} alt="Advertisement Banner" />
        )}
        <Box className={classes.contentWrapper}>
          <Typography variant="h2">{title || defaultTitle}</Typography>

          <Typography variant="body1" className={classes.subtitle}>
            {subtitle || defaultSubtitle}
          </Typography>

          <Link href={`${link || defaultLink}`} passHref>
            <Button variant="contained" color="primary" className={classes.button}>
              Shop now
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  )
}

export default HeroBanner
