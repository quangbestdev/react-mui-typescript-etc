import gql from 'graphql-tag'
import { useMutation, MutationHookOptions, useApolloClient } from '@apollo/react-hooks'
import {
  CreateCartItemMutation,
  CreateUserMutationVariables,
  createCartItem as createCartItemMutation,
  CreateCartItemInput,
  getVariant as getVariantQuery,
} from '@onextech/etc-api'
import { sanitizeData } from '../../../utils/data'
import { useUpdateVariant } from '../../variant'
import { getCreateCartedVariant } from '../utils'

const useCreateCartItem = (args: MutationHookOptions<CreateCartItemMutation, CreateUserMutationVariables> = {}) => {
  const [createCartItem, onCartItemCreated] = useMutation(gql(createCartItemMutation), args)
  const { handleUpdateVariant } = useUpdateVariant()
  const client = useApolloClient()

  const handleCreateCartItem = async (input: CreateCartItemInput) => {
    const { quantity, variantID } = input

    const onCreateCartItem = await createCartItem({ variables: { input: sanitizeData(input) } })
    const id = onCreateCartItem.data?.createCartItem?.id

    const { data } = await client.query({
      query: gql(getVariantQuery),
      variables: { id: variantID },
    })
    const variant = data?.getVariant
    await handleUpdateVariant({
      id: variant?.id,
      carted: sanitizeData(getCreateCartedVariant(variant, id, quantity)),
    })

    return onCreateCartItem
  }

  return {
    handleCreateCartItem,
    onCartItemCreated,
  }
}

export default useCreateCartItem
