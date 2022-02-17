export default (value) => {
  const minPassLength = 6;
  if (!value.trim() || value.length < minPassLength) return false;
  return true;
};
