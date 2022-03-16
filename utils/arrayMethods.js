const sortBy = (key, order = 'asc') => {
  return (a, b) => {
    const getValue = (object, keys) => {
      return keys.split('.').reduce((o, k) => o?.[k], object);
    };
    const firstValue = getValue(a, key);
    const secondValue = getValue(b, key);
    if (order === 'desc') return firstValue > secondValue ? -1 : +1;
    return firstValue > secondValue ? +1 : -1;
  };
};

module.exports = {
  sortBy,
};
