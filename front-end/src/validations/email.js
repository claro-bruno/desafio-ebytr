export default (value) => {
  const emailPattern = /^[a-z0-9_.]+@[a-z0-9]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
  return emailPattern.test(value) && !!value.trim();
};
