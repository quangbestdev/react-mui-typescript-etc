import React, { useState } from 'react'
import RouterLink from 'next/link'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  colors,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import GenericMoreButton from '../../../components/GenericMoreButton'
import TableEditBar from '../../../components/TableEditBar'
import { deleteTodoOptimisticResponse, deleteTodoDefaultInput, listTodosQuery } from '../../../api/Todo'
import { deleteTodo as DELETE_TODO } from '../../../graphql/mutations'
import PortalModal from '../../../components/PortalModal'
import TodoForm from '../TodoForm'
import ConfirmationCard from '../../../components/ConfirmationCard'

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 700,
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  pagination: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end',
  },
  actions: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1),
    },
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
  deleteButton: {
    color: colors.red[600],
    borderColor: colors.red[600],
    '&:hover': {
      borderColor: colors.red[900],
    },
  },
  editButton: {
    color: colors.blueGrey[600],
    borderColor: colors.blueGrey[600],
    '&:hover': {
      borderColor: colors.blueGrey[900],
    },
  },
}))

function Results({ className, items, ...rest }) {
  const classes = useStyles()
  const [selectedCustomers, setSelectedCustomers] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleSelectAll = (event) => {
    const selectedCustomers = event.target.checked ? items.map((item) => item.id) : []

    setSelectedCustomers(selectedCustomers)
  }

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomers.indexOf(id)
    let newSelectedCustomers = []

    if (selectedIndex === -1) {
      newSelectedCustomers = newSelectedCustomers.concat(selectedCustomers, id)
    } else if (selectedIndex === 0) {
      newSelectedCustomers = newSelectedCustomers.concat(selectedCustomers.slice(1))
    } else if (selectedIndex === selectedCustomers.length - 1) {
      newSelectedCustomers = newSelectedCustomers.concat(selectedCustomers.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelectedCustomers = newSelectedCustomers.concat(
        selectedCustomers.slice(0, selectedIndex),
        selectedCustomers.slice(selectedIndex + 1)
      )
    }

    setSelectedCustomers(newSelectedCustomers)
  }

  const handleChangePage = (event, page) => {
    setPage(page)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value)
  }

  const [deleteTodo] = useMutation(gql(DELETE_TODO), {
    update(cache, { data: { deleteTodo } }) {
      const data = cache.readQuery(listTodosQuery)
      data.listTodos.items = data.listTodos.items.filter((item) => item.id !== deleteTodo.id)
      cache.writeQuery({
        ...listTodosQuery,
        data,
      })
    },
  })

  const handleDelete = (data) => {
    deleteTodo({
      variables: { input: deleteTodoDefaultInput(data) },
      optimisticResponse: deleteTodoOptimisticResponse(data),
    })
  }

  const handleEdit = (data) => {
    return data
  }

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {items.length} Records found. Page {page + 1} of {Math.ceil(items.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader action={<GenericMoreButton />} title="All todos" />
        <Divider />
        <CardContent className={classes.content}>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomers.length === items.length}
                      color="primary"
                      indeterminate={selectedCustomers.length > 0 && selectedCustomers.length < items.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Updated At</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.slice(0, rowsPerPage).map((item) => (
                  <TableRow hover key={item.id} selected={selectedCustomers.indexOf(item.id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomers.indexOf(item.id) !== -1}
                        color="primary"
                        onChange={(event) => handleSelectOne(event, item.id)}
                        value={selectedCustomers.indexOf(item.id) !== -1}
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameCell}>
                        <div>
                          <RouterLink href="/management/todos/[id]" as={`/management/todos/${item.id}`} passHref>
                            <Link color="inherit" component="a" variant="h6">
                              {item.name}
                            </Link>
                          </RouterLink>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                    <TableCell>{item.updatedAt}</TableCell>
                    <TableCell align="right">
                      <div className={classes.actions}>
                        <RouterLink href="/management/todos/[id]" as={`/management/todos/${item.id}`} passHref>
                          <Button color="primary" component="a" size="small" variant="outlined">
                            View
                          </Button>
                        </RouterLink>
                        <PortalModal
                          toggle={(show) => (
                            <Button className={classes.editButton} size="small" variant="outlined" onClick={show}>
                              Edit
                            </Button>
                          )}
                        >
                          {({ hide }) => (
                            <TodoForm
                              title="Edit Todo"
                              onSubmit={() => {
                                handleEdit(item)
                                hide()
                              }}
                              onCancel={hide}
                            />
                          )}
                        </PortalModal>
                        <PortalModal
                          toggle={(show) => (
                            <Button className={classes.deleteButton} size="small" variant="outlined" onClick={show}>
                              Delete
                            </Button>
                          )}
                        >
                          {({ hide }) => (
                            <ConfirmationCard
                              title="Delete Todo"
                              onConfirm={() => {
                                handleDelete(item)
                                hide()
                              }}
                              onCancel={hide}
                            >
                              Are you sure you want to delete this todo?
                            </ConfirmationCard>
                          )}
                        </PortalModal>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardActions className={classes.pagination}>
          <TablePagination
            component="div"
            count={items.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedCustomers} />
    </div>
  )
}

Results.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
}

Results.defaultProps = {
  items: [],
}

export default Results
