const integer = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
module.exports.integer = integer;

module.exports.array = (length, min, max) => {
  const array = [];
  for (let i = 0; i < length; ++i) {
    array.push(integer(min, max));
  }
  return array;
};
