import gql from 'graphql-tag'
import { useMutation, MutationHookOptions } from '@apollo/react-hooks'
import {
  CreateVariantMutation,
  CreateUserMutationVariables,
  createVariant as createVariantMutation,
  CreateVariantInput,
} from '@onextech/etc-api'
import { sanitizeData } from '../../../utils/data'

const useCreateVariant = (args: MutationHookOptions<CreateVariantMutation, CreateUserMutationVariables> = {}) => {
  const [createVariant, onVariantCreated] = useMutation(gql(createVariantMutation), args)

  const handleCreateVariant = async (input: CreateVariantInput) => {
    const onCreateVariant = await createVariant({ variables: { input: sanitizeData(input) } })
    return onCreateVariant
  }

  return {
    handleCreateVariant,
    onVariantCreated,
  }
}

export default useCreateVariant
