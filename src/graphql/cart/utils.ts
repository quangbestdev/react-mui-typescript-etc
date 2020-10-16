import { VariantInterface } from '../variant'

/**
 * Get the updated variant.carted added with the created cartItem
 * @param variant the product variant
 * @param createdCartItemID id of cartitem to be updated
 * @param nextQuantity the new quantity
 */
export const getCreateCartedVariant = (variant: VariantInterface, cartItemID: string, quantity: number) => {
  const newCarted = {
    quantity,
    cartItemID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __typename: null,
  }
  if (variant?.carted?.length) {
    return variant.carted.concat(newCarted)
  }
  return [newCarted]
}

/**
 * Get the variant.carted which does not contain the deleted cartID
 * @param variant the product variant
 * @param deletedCartItemID the cartID which should not be included (deleted)
 */
export const getDeleteCartedVariant = (variant: VariantInterface, deletedCartItemID: string) => {
  return variant?.carted?.filter((item) => item.cartItemID !== deletedCartItemID)
}

/**
 * Update variant.carted item quantity with nextQuantity
 * @param variant the product variant
 * @param updateCartItemID id of cartitem to be updated
 * @param nextQuantity the new quantity
 */
export const getUpdateCartedVariant = (variant: VariantInterface, updateCartItemID: string, nextQuantity: number) => {
  // Get all variant.carted with this cartID
  const currentCartedVariant = variant?.carted?.filter((item) => item.cartItemID === updateCartItemID)

  // If more than one item of this cartID in variant, combine them into one item with the new quantity
  if (currentCartedVariant.length > 1) {
    const newCarted = {
      quantity: nextQuantity,
      cartItemID: updateCartItemID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __typename: null,
    }
    return variant?.carted?.filter((item) => item.cartItemID !== updateCartItemID).concat(newCarted)
  }

  // If only one item of this cartID in variant, update the new quantity directly
  return variant?.carted?.map((item) => {
    // Don't update quantity of item that are not this cartID
    if (item.cartItemID !== updateCartItemID) {
      return item
    }
    return {
      ...item,
      updatedAt: new Date().toISOString(),
      quantity: nextQuantity,
    }
  })
}

/**
 * Get quantity of all carted in the variant except for provided cart ID
 * @param variant the product variant
 * @param cartItemID the cartID to ignore
 */
export const getCartedVariantQuantity = (variant: VariantInterface, cartItemID: string) => {
  if (!variant?.carted?.length) {
    return 0
  }
  // Get quantity from all carted except current cartID
  return variant.carted.reduce(
    (totalQuantity, item) => (item.cartItemID !== cartItemID ? totalQuantity + item.quantity : totalQuantity),
    0
  )
}

/**
 * Get variant.carted deleted item's quantity to update variant.stock
 * @param variant the product variant
 * @param deletedCartItemID the cartID which is to be deleted
 */
export const getDeleteCartedVariantQuantity = (variant: VariantInterface, deletedCartItemID: string) => {
  const deletedCartedVariant = variant?.carted
    ?.filter((item) => item.cartItemID === deletedCartItemID)
    .map((item) => item.quantity)
  return deletedCartedVariant?.reduce((totalQuantity, quantity) => totalQuantity + quantity) || 0
}
