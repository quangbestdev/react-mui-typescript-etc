import React from 'react'
import { StripeElementChangeEvent } from '@stripe/stripe-js'
import CardCvc, { CardCvcProps } from './CardCvc'

interface CardCvcFieldProps extends Omit<CardCvcProps, 'onChange'> {
  onChange: (complete: boolean) => void
  onBlur: () => void
}

const CardCvcField: React.FC<CardCvcFieldProps> = (props) => {
  const { onChange, onBlur, ...rest } = props
  const handleChange = (event: StripeElementChangeEvent) => {
    const { empty, complete } = event
    onChange(empty ? undefined : complete)
  }
  return <CardCvc onChange={handleChange} onBlur={onBlur} {...rest} />
}

export default CardCvcField
