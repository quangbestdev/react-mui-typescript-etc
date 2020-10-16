export const getVariantAttrsFromVariants = (variants) =>
  variants?.reduce((variantAttrs, { attrs }) => {
    if (!attrs) return variantAttrs
    const nextAttrs = attrs.reduce((nextAttrs, { title, value }) => ({ ...nextAttrs, [title]: value }), {})
    return [...variantAttrs, nextAttrs]
  }, []) ?? []

export const disableOptionValuesForUnavailableVariants = (option, variantAttrs, formValues) => {
  return option.values.map((value) => {
    const disabled = !variantAttrs.some((variantAttr) => {
      if (variantAttr[option.title] !== value) return false
      return Object.entries(formValues)
        .filter(([key]) => key !== 'quantity' && key !== option.title)
        .every(([k, v]) => v === '' || variantAttr[k] === v)
    })
    return { value, label: value, disabled }
  })
}
