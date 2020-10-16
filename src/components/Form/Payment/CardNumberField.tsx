import React from 'react'
import { StripeElementChangeEvent } from '@stripe/stripe-js'
import CardNumber, { CardNumberProps } from './CardNumber'

interface CardNumberFieldProps extends Omit<CardNumberProps, 'onChange'> {
  onChange: (complete: boolean) => void
  onBlur: () => void
}

const CardNumberField: React.FC<CardNumberFieldProps> = (props) => {
  const { onChange, onBlur, ...rest } = props
  const handleChange = (event: StripeElementChangeEvent) => {
    const { empty, complete } = event
    onChange(empty ? undefined : complete)
  }
  return <CardNumber onChange={handleChange} onBlur={onBlur} {...rest} />
}

export default CardNumberField
