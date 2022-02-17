const DATE_SIZE = 10;

const getFormatedDate = (date) => {
  const [year, month, day] = date
    .split('')
    .splice(0, DATE_SIZE)
    .join('')
    .split('-');

  return `${day}/${month}/${year}`;
};

export default getFormatedDate;
