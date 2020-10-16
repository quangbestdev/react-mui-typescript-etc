import React from 'react'
import { Box, Button, Container, Grid, Link, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BookTicketModal from './Modals/BookTicketModal'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(7, 3),
    },
  },
  image: {
    minWidth: 300,
    minHeight: 300,
    backgroundImage: ({ image }: BookTicketsProps) => `url('${image.image}')`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    borderRadius: 10,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: ({ image }: BookTicketsProps) => image.width,
      height: ({ image }: BookTicketsProps) => image.height,
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      backgroundImage: ({ cornerImage }: BookTicketsProps) => `url('${cornerImage.image}')`,
      backgroundPosition: 'right 0px top 0px',
      backgroundRepeat: 'no-repeat',
      backgroundSize: ({ cornerImage }: BookTicketsProps) => `${cornerImage.width}px ${cornerImage.height}px`,
      alignItems: 'flex-start',
      paddingLeft: theme.spacing(11),
    },
    [theme.breakpoints.down('sm')]: {
      '& .MuiTypography-root': {
        textAlign: 'center',
      },
    },
  },
  title: {
    maxWidth: 390,
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(9),
    },
  },
  description: {
    maxWidth: 460,
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(20),
    padding: theme.spacing(3, 0),
  },
  button: {
    padding: theme.spacing(1, 4),
  },
}))

interface ImageProps {
  image: string
  width: number
  height: number
}

interface BookTicketsProps {
  title?: string
  image?: ImageProps
  cornerImage?: ImageProps
  description?: string
  buttonText?: string
}

const BookTickets: React.FC<BookTicketsProps> = (props) => {
  const { image, title, description, buttonText } = props
  const classes = useStyles(props)

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={6}>
          {image && <Box className={classes.image} />}
        </Grid>
        <Grid item xs={12} md={6} className={classes.content}>
          {title && (
            <Typography variant="h3" className={classes.title}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography variant="body1" className={classes.description}>
              {description}
            </Typography>
          )}
          {buttonText && (
            <BookTicketModal
              toggle={(show) => (
                <Button className={classes.button} onClick={show} variant="contained" color="primary">
                  {buttonText}
                </Button>
              )}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default BookTickets
