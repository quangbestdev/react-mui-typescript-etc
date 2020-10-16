import gql from 'graphql-tag'
import { useMutation, MutationHookOptions } from '@apollo/react-hooks'
import {
  UpdateVariantMutation,
  UpdateVariantMutationVariables,
  updateVariant as updateVariantMutation,
  UpdateVariantInput,
} from '@onextech/etc-api'
import { sanitizeData } from '../../../utils/data'

const useUpdateVariant = (args: MutationHookOptions<UpdateVariantMutation, UpdateVariantMutationVariables> = {}) => {
  const [updateVariant, onVariantUpdated] = useMutation(gql(updateVariantMutation), args)

  const handleUpdateVariant = async (input: UpdateVariantInput) => {
    const onUpdateVariant = await updateVariant({ variables: { input: sanitizeData(input) } })
    return onUpdateVariant
  }

  return {
    handleUpdateVariant,
    onVariantUpdated,
  }
}

export default useUpdateVariant
