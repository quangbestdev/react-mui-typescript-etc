import React from 'react'
import {
  Checkbox,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Typography,
  Theme,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'
import { useFilters } from '@onextech/gvs-kit/hooks'
import { useListCategories } from '../../../graphql/category'
import { useListMerchants, MerchantInterface } from '../../../graphql/merchant'

interface ProductsFilterFormProps {
  filters: ReturnType<typeof useFilters>[0]
  addFilter: ReturnType<typeof useFilters>[1]
}

const useStyles = makeStyles((theme: Theme) => ({
  expansionPanelRoot: {
    boxShadow: 'none',
    '&.Mui-expanded': {
      margin: 0,
    },
    '&.MuiExpansionPanel-root:before': {
      backgroundColor: 'transparent',
    },
    '& > .MuiExpansionPanelSummary-root, &.MuiExpansionPanelSummary-root.Mui-expanded': {
      //  Override the default behavior so height remains consistent
      height: 48,
      minHeight: 'initial',
    },
  },
  expansionPanelHeader: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2),
    },
  },
  listItem: {
    '&.MuiListItem-gutters': {
      padding: 0,
    },
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: 'transparent',
    },
    // Change font weight to bold when selected - hard to target text directly
    '&.Mui-selected > div > span ': {
      fontWeight: 800,
    },
  },
  listItemText: {
    '& > span': {
      color: theme.palette.text.secondary,
    },
  },
  expansionPanelDetailsRoot: {
    padding: theme.spacing(0, 3, 3),
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2),
    },
  },
  formControlLabel: {
    display: 'flex',
    '& > .MuiFormControlLabel-label': {
      color: theme.palette.text.secondary,
    },
  },
  checkBox: {
    '&.MuiCheckbox-colorSecondary.Mui-checked': {
      color: theme.palette.primary.main,
    },
  },
  radioButton: {
    '&.MuiRadio-colorSecondary.Mui-checked': {
      color: theme.palette.primary.main,
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
    <>
      {/* Products Type Filter */}
      <ExpansionPanel defaultExpanded className={classes.expansionPanelRoot}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.expansionPanelHeader} variant="body2">
            Products
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetailsRoot}>
          <List>
            <ListItem
              button
              className={classes.listItem}
              selected={selectedCategory === null}
              onClick={() => handleChangeCategory(null)}
            >
              <ListItemText className={classes.listItemText} primaryTypographyProps={{ variant: 'body1' }}>
                All Products
              </ListItemText>
            </ListItem>
            {Boolean(categories.length) &&
              categories.map((category) => (
                <ListItem
                  button
                  key={category.id}
                  className={classes.listItem}
                  selected={selectedCategory && selectedCategory.id === category.id}
                  onClick={() => handleChangeCategory(category)}
                >
                  <ListItemText className={classes.listItemText} primaryTypographyProps={{ variant: 'body1' }}>
                    {category.title}
                  </ListItemText>
                </ListItem>
              ))}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <Divider variant="middle" />

      {/* Brand Filter */}
      <ExpansionPanel defaultExpanded className={classes.expansionPanelRoot}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.expansionPanelHeader} variant="body2">
            Brand
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetailsRoot}>
          <List>
            {Boolean(brands.length) &&
              brands.map((brand) => {
                const checked = Boolean(filters?.merchants?.find(({ id }) => id === brand.id))
                return (
                  <FormControlLabel
                    className={classes.formControlLabel}
                    key={brand.id}
                    control={
                      <Checkbox
                        className={classes.checkBox}
                        onChange={(e) => handleChangeBrand(e, brand)}
                        checked={checked}
                      />
                    }
                    label={brand.title}
                  />
                )
              })}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  )
}

export default ProductsFilterForm
