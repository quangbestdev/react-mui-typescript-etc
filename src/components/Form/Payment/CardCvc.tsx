import React, { useState } from 'react'
import { CardCvcElement } from '@stripe/react-stripe-js'
import CardFieldWrapper from './CardFieldWrapper'
import { useGetCardElementStyle } from './constants'

export interface CardCvcProps extends React.ComponentProps<typeof CardCvcElement> {
  wrapper?: React.ComponentProps<typeof CardFieldWrapper>
}

const CardCvc: React.FC<CardCvcProps> = (props) => {
  const { wrapper, options, onChange, ...rest } = props

  const cardElementStyle = useGetCardElementStyle()

  const [error, setError] = useState()

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message)
    } else {
      setError(null)
    }
    onChange?.(event)
  }

  return (
    <CardFieldWrapper label="CVC" error={error || wrapper?.error} {...wrapper}>
      <CardCvcElement options={{ ...cardElementStyle, ...options }} onChange={handleChange} {...rest} />
    </CardFieldWrapper>
  )
}

export default CardCvc
