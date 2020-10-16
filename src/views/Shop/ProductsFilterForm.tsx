import React from 'react'
import {
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  RadioGroup,
  Typography,
  Theme,
  Checkbox,
  Box,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'
import { useFilters } from '@onextech/gvs-kit/hooks'
import { useListCategories } from '../../graphql/category'
import { useListMerchants, MerchantInterface } from '../../graphql/merchant'

interface ProductsFilterFormProps {
  filters?: ReturnType<typeof useFilters>[0]
  addFilter?: ReturnType<typeof useFilters>[1]
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiExpansionPanel-rounded:first-child': {
      borderRadius: '10px 10px 0px 0px',
    },
    '& .MuiExpansionPanel-rounded:last-child': {
      borderRadius: '0px 0px 10px 10px',
    },
  },
  expansionPanelRoot: {
    boxShadow: 'none',
    '&.Mui-expanded': {
      margin: 0,
    },
  },
  expansionPanelHeader: {
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  expansionPanelDetailsRoot: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(0, 3, 3),
  },
  list: {
    width: '100%',
    '& .MuiDivider-root': {
      width: '100%',
      height: 1,
      margin: theme.spacing(2, 0),
      backgroundColor: theme.palette.border.main,
      '&:last-child': {
        display: 'none',
      },
    },
  },
  listItem: {
    '&.MuiListItem-gutters': {
      padding: 0,
    },
  },
  listItemCategory: {
    '& .MuiTypography-root': {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(18),
    },
  },
  listItemCount: {
    textAlign: 'right',
    '& .MuiTypography-root': {
      color: theme.palette.text.hint,
      fontSize: theme.typography.pxToRem(18),
    },
  },
  checkboxGroup: {
    '& .MuiTypography-root': {
      fontSize: theme.typography.pxToRem(16),
    },
    '& .MuiCheckbox-root': {
      color: theme.palette.border.main,
    },
    '& .Mui-checked': {
      color: theme.palette.error.dark,
    },
  },
  divider: {
    height: 1,
    backgroundColor: theme.palette.border.main,
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(3.5),
    },
  },
}))

const ProductsFilterForm: React.FC<ProductsFilterFormProps> = (props) => {
  const classes = useStyles(props)
  const { filters, addFilter } = props
  const { categories } = useListCategories()
  const { merchants: brands } = useListMerchants()
  const [selectedCategory = null] = filters?.categories || []

  const handleChangeCategory = (category) => {
    addFilter({ categories: category ? [category] : null })
  }

  const handleChangeBrand = (e: React.ChangeEvent<HTMLInputElement>, brand: MerchantInterface) => {
    const { checked } = e.target
    const merchants = filters?.merchants || []
    const nextMerchants = checked ? merchants.concat(brand) : merchants.filter(({ id }) => id !== brand.id)
    addFilter({ merchants: nextMerchants })
  }

  return (
    <Box className={classes.root}>
      {/* Product Types Filter */}
      <ExpansionPanel defaultExpanded className={classes.expansionPanelRoot}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.expansionPanelHeader} variant="button">
            Product Types
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetailsRoot}>
          <List className={classes.list}>
            {Boolean(categories.length) &&
              categories.map((category) => (
                <>
                  <ListItem
                    button
                    key={category.id}
                    className={classes.listItem}
                    selected={selectedCategory && selectedCategory.id === category.id}
                    onClick={() => handleChangeCategory(category)}
                  >
                    <ListItemText className={classes.listItemCategory}>{category.title}</ListItemText>
                  </ListItem>
                  <Divider />
                </>
              ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  )
}

export default ProductsFilterForm
