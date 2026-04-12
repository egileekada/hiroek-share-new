// ===============================
// Currency List
// ===============================
export const currencies = ["usd", "cad", "eur", "gbp", "aud", "nzd"] as const;
export type Currency = (typeof currencies)[number];

// ===============================
// Currency Symbols
// ===============================
export const currencySymbols: Record<Currency, string> = {
  usd: "$",
  cad: "$",
  eur: "€",
  gbp: "£",
  aud: "$",
  nzd: "$",
};

// ===============================
// Same function you had
// ===============================
export const formatNumberWithK = (number: any) => {
  if (number === 0 || !number) return "0";
  return number > 999 ? `${Math.trunc(number / 1000)}k` : number;
};

// ===============================
// Currency OPTIONAL
// ===============================
export const numberFormatCurrency = (value: any, currency?: Currency) => {
  const symbol = currency ? currencySymbols[currency] : "";

  return (
    symbol +
    Number(value)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
};

// ===============================
// K Format with OPTIONAL currency
// ===============================
export const formatNumberWithKCurrency = (
  value: any,
  currency?: Currency
) => {
  const symbol = currency ? currencySymbols[currency] : "";

  if (value === 0 || !value) return symbol + "0";

  return value > 999
    ? `${symbol}${Math.trunc(value / 1000)}k`
    : symbol + value;
};

// ===============================
// Plain Number Formatter (no symbol)
// ===============================
export const numberFormat = (x: any) => {
  return Number(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
