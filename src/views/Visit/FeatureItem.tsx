import React from 'react'
import { Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    maxWidth: '100%',
  },
  gridContainer: {
    marginBottom: theme.spacing(2),
  },
  title: {
    color: theme.palette.secondary.contrastText,
    fontSize: theme.typography.pxToRem(18),
  },
  description: {
    color: theme.palette.text.hint,
    fontSize: theme.typography.pxToRem(16),
  },
}))

interface FeatureItemProps {
  title: string
  description: string
  image: string
}

const FeatureItem: React.FunctionComponent<FeatureItemProps> = (props) => {
  const { title, description, image } = props
  const classes = useStyles(props)

  return (
    <Grid container className={classes.gridContainer}>
      {/* Left grid */}
      <Grid item xs={3}>
        <img src={image} className={classes.img} alt={image} />
      </Grid>

      {/* Right grid */}
      <Grid item xs={9}>
        <Typography variant="body1" gutterBottom className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" className={classes.description}>
          {description}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default FeatureItem
