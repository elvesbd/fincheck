export function currencyStringToNumber(value: string): number {
  const sanitizedString = value
    .replace(/\./g, '')
    .replace(',', '.')

  return Number(sanitizedString)
}
