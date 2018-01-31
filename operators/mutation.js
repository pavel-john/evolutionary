const CONST = require('../constants');

const mutateGene = gene => gene ? 0 : 1;

module.exports.default = (parentCombination, mutationRate) => {
  const genome = [];
  for (originalGene of parentCombination.genome) {
    gene = (Math.random() < mutationRate) ? originalGene : mutateGene(originalGene);
    genome.push(gene);
  }
  return {
    genome,
    fitness: CONST.FITNESS_UNKNOWN,
  }
};
