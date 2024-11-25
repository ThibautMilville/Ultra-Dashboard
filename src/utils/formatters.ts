interface FormatCurrencyOptions {
  decimals?: number;
  useGrouping?: boolean;
}

export const formatCurrency = (
  amount: number,
  currency: 'USD' | 'EUR',
  eurRate: number = 1,
  options: FormatCurrencyOptions = {}
): string => {
  const { decimals = 2, useGrouping = true } = options;
  const value = currency === 'EUR' ? amount * eurRate : amount;

  const formattedValue = useGrouping
    ? value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : value.toFixed(decimals);

  return currency === 'EUR'
    ? `${formattedValue}€`
    : `$${formattedValue}`;
};