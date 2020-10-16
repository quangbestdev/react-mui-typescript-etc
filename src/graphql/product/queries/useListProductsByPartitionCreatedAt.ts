import gql from 'graphql-tag'
import { QueryHookOptions, useQuery } from '@apollo/react-hooks'
import {
  ListProductsByPartitionCreatedAtQuery,
  ListProductsByPartitionCreatedAtQueryVariables,
  listProductsByPartitionCreatedAt,
  PartitionEnum,
  ModelSortDirection,
} from '@onextech/etc-api'
import { usePagination } from '@onextech/gvs-kit/hooks'
import { DEFAULT_LIMIT } from '../../constants'

const defaultVariables = {
  limit: DEFAULT_LIMIT,
  nextToken: null,
  partition: PartitionEnum.PARTITION,
  sortDirection: ModelSortDirection.DESC,
}

const useListProductsByPartitionCreatedAt = (
  args: QueryHookOptions<ListProductsByPartitionCreatedAtQuery, ListProductsByPartitionCreatedAtQueryVariables> = {}
) => {
  const { variables, skip } = args

  const query = gql(listProductsByPartitionCreatedAt)
  const nextVariables = { ...defaultVariables, ...variables }

  const { loading, error, data, fetchMore } = useQuery<
    ListProductsByPartitionCreatedAtQuery,
    ListProductsByPartitionCreatedAtQueryVariables
  >(query, {
    variables: nextVariables,
    skip,
  })

  // Extract data
  const { items = [], nextToken } = data?.listProductsByPartitionCreatedAt || {}

  // Pagination
  const pagination = usePagination(nextToken, fetchMore, {
    query,
    variables: { ...nextVariables, nextToken },
    skip: loading,
  })

  return {
    loading,
    error,
    products: items,
    // Pagination
    pagination,
  }
}

export default useListProductsByPartitionCreatedAt
