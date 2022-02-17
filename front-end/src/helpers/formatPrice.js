const formatPrice = (price) => {
  const priceString = parseFloat(price).toFixed(2);
  return priceString.replace(/\./, ',');
};

export default formatPrice;
