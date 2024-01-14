const rupiah = (number, minDigit = 0, maxDigit = 0) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: minDigit,
    maximumFractionDigits: maxDigit,
  }).format(number);
};

const percentage = (number, minDigit = 0, maxDigit = 0) => {
  return new Intl.NumberFormat("id-ID", {
    style: "percent",
    minimumFractionDigits: minDigit,
    maximumFractionDigits: maxDigit,
  }).format(number);
}

export { rupiah, percentage }
