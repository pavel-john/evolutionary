const CONST = require('../constants');

module.exports.default = (parent1, parent2) => {
  const genome = [];
  // combine the two genes evenly
  for (let geneOrder = 0; geneOrder < parent1.genome.length; ++geneOrder) {
    const gene = (Math.random() < 0.5) ?
      parent1.genome[geneOrder] :
      parent2.genome[geneOrder];
    genome.push(gene);
  }
  return {
    genome,
    fitness: CONST.FITNESS_UNKNOWN,
  }
};
