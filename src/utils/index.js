const filterFields = (body, array) => {
  return Object.keys(body).every((item) => {
    return array.includes(item);
  });
};

module.exports = { filterFields };
