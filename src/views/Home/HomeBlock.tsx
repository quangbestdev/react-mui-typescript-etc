import React from 'react'
import Link from 'next/link'
import { Box, BoxProps, Container, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(7),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(13),
    },
  },
  heading: {
    paddingBottom: theme.spacing(4),
    '& .MuiGrid-item': {
      display: 'flex',
      alignItems: 'flex-end',
      '&:last-child': {
        justifyContent: 'flex-end',
      },
    },
  },
  viewAllLink: {
    textDecoration: 'none',
    lineHeight: 1,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

interface HomeBlockProps extends BoxProps {
  title?: string
  viewAllLink?: string
}

const HomeBlock: React.FC<HomeBlockProps> = (props) => {
  const { title, viewAllLink, children, ...rest } = props
  const classes = useStyles(props)

  return (
    <Box className={classes.root} {...rest}>
      <Container>
        {title && (
          <Grid container className={classes.heading}>
            <Grid item xs={10}>
              <Typography variant="h5">{title}</Typography>
            </Grid>
            <Grid item xs={2}>
              {viewAllLink && (
                <Link href={viewAllLink} passHref>
                  <Typography className={classes.viewAllLink} component="a" variant="overline">
                    View All
                  </Typography>
                </Link>
              )}
            </Grid>
          </Grid>
        )}
        {children}
      </Container>
    </Box>
  )
}

export default HomeBlock
