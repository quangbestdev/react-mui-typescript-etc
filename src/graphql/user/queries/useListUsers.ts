import gql from 'graphql-tag'
import { useQuery, QueryHookOptions } from '@apollo/react-hooks'
import { ListUsersQuery, ListUsersQueryVariables, listUsers as listUsersQuery } from '@onextech/etc-api'
import { DEFAULT_LIMIT } from '../../constants'

const defaultFilter = { status: { eq: 'published' } }

const useListUsers = (args: QueryHookOptions<ListUsersQuery, ListUsersQueryVariables> = {}) => {
  const { data, ...rest } = useQuery(gql(listUsersQuery), {
    ...args,
    variables: {
      limit: DEFAULT_LIMIT,
      ...args?.variables,
      filter: { ...defaultFilter, ...args?.variables?.filter },
    },
  })

  const users = data?.listUsers?.items ?? []

  return {
    users,
    ...rest,
  }
}

export default useListUsers
