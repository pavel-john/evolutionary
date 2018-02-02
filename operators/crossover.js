const CONST = require('../constants');
const Random = require('../helpers/random');

module.exports.default = (parent1, parent2) => {
  // randomize the place to cut
  const cut = Random.integer(0, parent1.length);
  // combine the two genomes
  const genome = Array.prototype.concat(
    parent1.genome.slice(0, cut),
    parent2.genome.slice(cut, parent2.genome.length)
  );
  return {
    genome,
    fitness: CONST.FITNESS_UNKNOWN,
  }
};
