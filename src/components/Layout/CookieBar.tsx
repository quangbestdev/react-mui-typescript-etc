import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box, Button, Link, Typography } from '@material-ui/core'

const COOKIE_NAME_CONSENT = 'consent'
enum ConsentCookieValue {
  True = 'true',
  False = 'false',
}

type CookieBarProps = React.ComponentProps<typeof Box>

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    opacity: 0.8,
    padding: theme.spacing(1.125, 1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    zIndex: 1000,
    '& > :not(:first-child)': {
      marginTop: theme.spacing(1.125),
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      '& > :not(:first-child)': {
        marginTop: theme.spacing(0),
        marginLeft: theme.spacing(1),
      },
    },
  },
}))

const CookieBar: React.FC<CookieBarProps> = (props) => {
  const { className, ...rest } = props
  const classes = useStyles({})

  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const consent = Cookies.get(COOKIE_NAME_CONSENT)

    if (consent === ConsentCookieValue.True) {
      setHasConsent(true)
    }
  }, [])

  const onOkBtnClick = () => {
    Cookies.set(COOKIE_NAME_CONSENT, ConsentCookieValue.True)
    setHasConsent(true)
  }

  if (hasConsent) {
    return null
  }

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Typography variant="caption" color="inherit">
        We use cookies to improve your experience on our site and to show you personalised advertising. To find out
        more, read our{' '}
        <Link href="/" underline="always" color="inherit">
          privacy policy and cookie policy
        </Link>
        .
      </Typography>
      <Button variant="contained" color="secondary" size="small" onClick={onOkBtnClick}>
        OK
      </Button>
    </Box>
  )
}

export default CookieBar
