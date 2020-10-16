import { useQuery, QueryHookOptions } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {
  listAdvertisements as LIST_ADVERTISEMENTS,
  ListAdvertisementsQuery,
  ListAdvertisementsQueryVariables,
} from '@onextech/etc-api'
import { DEFAULT_LIMIT } from '../../constants'

const useListAdvertisements = (
  args: QueryHookOptions<ListAdvertisementsQuery, ListAdvertisementsQueryVariables> = {}
) => {
  const { loading, error, data, refetch } = useQuery<ListAdvertisementsQuery, ListAdvertisementsQueryVariables>(
    gql(LIST_ADVERTISEMENTS),
    {
      ...args,
      variables: { limit: DEFAULT_LIMIT, ...args.variables },
    }
  )

  const advertisements = data?.listAdvertisements?.items ?? []

  return {
    loading,
    error,
    advertisements,
    refetch,
  }
}

export default useListAdvertisements
