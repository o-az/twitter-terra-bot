export const currency = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    minimumIntegerDigits: 2,
  }).format(number)
}

export const currencyCompact = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
