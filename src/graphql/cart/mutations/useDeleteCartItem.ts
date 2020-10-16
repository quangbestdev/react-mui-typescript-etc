import gql from 'graphql-tag'
import { useMutation, MutationHookOptions, useApolloClient } from '@apollo/react-hooks'
import {
  DeleteCartItemMutation,
  DeleteCartItemMutationVariables,
  deleteCartItem as deleteCartItemMutation,
  DeleteCartItemInput,
  getCartItem as getCartItemQuery,
} from '@onextech/etc-api'
import { sanitizeData } from '../../../utils/data'
import { useUpdateVariant } from '../../variant'
import { getDeleteCartedVariant } from '../utils'

const useDeleteCartItem = (args: MutationHookOptions<DeleteCartItemMutation, DeleteCartItemMutationVariables> = {}) => {
  const [deleteCartItem, onCartItemDeleted] = useMutation(gql(deleteCartItemMutation), args)
  const { handleUpdateVariant } = useUpdateVariant()
  const client = useApolloClient()

  const handleDeleteCartItem = async (input: DeleteCartItemInput) => {
    const { id } = input

    const { data } = await client.query({
      query: gql(getCartItemQuery),
      variables: { id },
    })
    const variant = data?.getCartItem?.variant
    await handleUpdateVariant({
      id: variant?.id,
      carted: sanitizeData(getDeleteCartedVariant(variant, id)),
    })

    const onDeleteCartItem = await deleteCartItem({ variables: { input: sanitizeData(input) } })
    return onDeleteCartItem
  }

  return {
    handleDeleteCartItem,
    onCartItemDeleted,
  }
}

export default useDeleteCartItem
