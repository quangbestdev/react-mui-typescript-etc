import React, { useMemo, useState } from 'react'
import { Box, Paper, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'

interface TabsProps {
  items: Array<{ label: string; content: React.ReactNode }>
}

const useStyles = makeStyles(() => ({
  tabLabelsWrapper: {
    display: 'flex',
  },
}))

const TabLabel = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0.5, 2),
    '&:hover': {
      cursor: 'pointer',
    },
    '& .MuiTypography-root': {
      color: theme.palette.primary.light,
    },
  },
}))(Box)

const ActiveTabLabel = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    border: '1px solid #eae3e3',
    borderBottom: 'none',
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  },
}))(TabLabel)

const TabContent = withStyles((theme) => ({
  root: {
    marginLeft: 1,
    padding: theme.spacing(5.75, 3.75),
  },
}))(Paper)

const Tabs: React.FC<TabsProps> = (props) => {
  const { items } = props
  const classes = useStyles({})

  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const content = useMemo(() => {
    const activeTab = items[activeTabIndex]
    return activeTab.content
  }, [items, activeTabIndex])

  return (
    <div>
      <Box className={classes.tabLabelsWrapper}>
        {items.map(({ label }, i) => {
          const Wrapper = i === activeTabIndex ? ActiveTabLabel : TabLabel
          return (
            <Wrapper onClick={() => setActiveTabIndex(i)}>
              <Typography variant="body2">{label}</Typography>
            </Wrapper>
          )
        })}
      </Box>
      <TabContent elevation={2}>{content}</TabContent>
    </div>
  )
}

export default Tabs
