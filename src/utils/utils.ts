import config from '../config'

const currencyOptions = { style: 'currency', currency: 'SGD' }
const currencyFormat = new Intl.NumberFormat(config.locale, currencyOptions)

export const formatCurrency = (value: number) => {
  return currencyFormat.format(value)
}

export const duplicateArr = (arr, times) =>
  Array(times)
    .fill([...arr])
    .reduce((a, b) => a.concat(b))
