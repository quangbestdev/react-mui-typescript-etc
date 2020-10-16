import gql from 'graphql-tag'
import { useMutation, MutationHookOptions } from '@apollo/react-hooks'
import {
  DeleteVariantMutation,
  DeleteVariantMutationVariables,
  deleteVariant as deleteVariantMutation,
  DeleteVariantInput,
} from '@onextech/etc-api'
import { sanitizeData } from '../../../utils/data'

const useDeleteVariant = (args: MutationHookOptions<DeleteVariantMutation, DeleteVariantMutationVariables> = {}) => {
  const [deleteVariant, onVariantDeleted] = useMutation(gql(deleteVariantMutation), args)

  const handleDeleteVariant = async (input: DeleteVariantInput) => {
    const onDeleteVariant = await deleteVariant({ variables: { input: sanitizeData(input) } })
    return onDeleteVariant
  }

  return {
    handleDeleteVariant,
    onVariantDeleted,
  }
}

export default useDeleteVariant
