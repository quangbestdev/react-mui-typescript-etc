import React from 'react'
import { StripeElementChangeEvent } from '@stripe/stripe-js'
import CardExpiry, { CardExpiryProps } from './CardExpiry'

interface CardExpiryFieldProps extends Omit<CardExpiryProps, 'onChange'> {
  onChange: (complete: boolean) => void
  onBlur: () => void
}

const CardExpiryField: React.FC<CardExpiryFieldProps> = (props) => {
  const { onChange, onBlur, ...rest } = props
  const handleChange = (event: StripeElementChangeEvent) => {
    const { empty, complete } = event
    onChange(empty ? undefined : complete)
  }
  return <CardExpiry onChange={handleChange} onBlur={onBlur} {...rest} />
}

export default CardExpiryField
