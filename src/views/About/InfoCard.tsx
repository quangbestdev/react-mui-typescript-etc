import React from 'react'
import clsx from 'clsx'
import { BoxProps, Box, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles<Theme, InfoCardProps>((theme) => ({
  infoCard: {
    width: 290,
    height: 360,
    background: ({ image }: InfoCardProps) =>
      `linear-gradient(to top, ${theme.palette.common.black}, rgba(0, 0, 0, 0) 86%), url('${image}')`,
    // TODO: Not sure why important is required for the styles but without it the styles don't take effect
    backgroundPosition: 'center !important',
    backgroundRepeat: 'no-repeat !important',
    backgroundSize: '290px 360px !important',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: theme.spacing(4),
    [theme.breakpoints.only('xs')]: {
      margin: '0 auto',
    },
    '&:hover': {
      background: ({ image }: InfoCardProps) =>
        `linear-gradient(to top, rgba(179, 78, 64, 0.8), rgba(179, 78, 64, 0.8)), url('${image}')`,
      justifyContent: 'flex-start',
      padding: theme.spacing(4),
      '& .MuiTypography-root': {
        fontWeight: 700,
      },
      '& #description': {
        display: 'inline',
      },
    },
  },
  title: {
    color: theme.palette.primary.contrastText,
  },
  subtitle: {
    color: theme.palette.primary.contrastText,
    marginBottom: theme.spacing(2),
  },
  descriptionWrapper: {
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
  description: {
    display: 'none',
    color: theme.palette.text.contrast,
    fontWeight: 700,
    lineHeight: 1.2,
  },
}))

interface InfoCardProps extends BoxProps {
  className?: string
  title?: string
  subtitle?: string
  description?: string
  image: string
}

const InfoCard: React.FC<InfoCardProps> = (props) => {
  const { className, title, subtitle, description } = props
  const classes = useStyles(props)

  return (
    <Box className={clsx(classes.infoCard, className)}>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="body2" className={classes.subtitle}>
        {subtitle}
      </Typography>
      <Box className={classes.descriptionWrapper}>
        <Typography variant="subtitle1" className={classes.description} id="description">
          {description}
        </Typography>
      </Box>
    </Box>
  )
}

export default InfoCard
