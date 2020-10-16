import gql from 'graphql-tag'
import { useMutation, MutationHookOptions, useApolloClient } from '@apollo/react-hooks'
import {
  UpdateCartItemMutation,
  UpdateCartItemMutationVariables,
  updateCartItem as updateCartItemMutation,
  UpdateCartItemInput,
  getCartItem as getCartItemQuery,
} from '@onextech/etc-api'
import { sanitizeData } from '../../../utils/data'
import { useUpdateVariant } from '../../variant'
import { getUpdateCartedVariant } from '../utils'

const useUpdateCartItem = (args: MutationHookOptions<UpdateCartItemMutation, UpdateCartItemMutationVariables> = {}) => {
  const [updateCartItem, onCartItemUpdated] = useMutation(gql(updateCartItemMutation), args)
  const { handleUpdateVariant } = useUpdateVariant()
  const client = useApolloClient()

  const handleUpdateCartItem = async (input: UpdateCartItemInput) => {
    const { id, quantity } = input

    const { data } = await client.query({
      query: gql(getCartItemQuery),
      variables: { id },
    })
    const variant = data?.getCartItem?.variant
    await handleUpdateVariant({
      id: variant?.id,
      carted: sanitizeData(getUpdateCartedVariant(variant, id, quantity)),
    })

    const onUpdateCartItem = await updateCartItem({ variables: { input: sanitizeData(input) } })
    return onUpdateCartItem
  }

  return {
    handleUpdateCartItem,
    onCartItemUpdated,
  }
}

export default useUpdateCartItem
