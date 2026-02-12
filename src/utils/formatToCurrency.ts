const formatToCurrency = (amount: number) => {
  const numberFormatted = new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return numberFormatted.format(amount);
};

export default formatToCurrency;
