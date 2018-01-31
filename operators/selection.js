// fitness proportionate selection (roulette)
module.exports.default = (generation, generationFitness) => {
  const draw = Math.random();
  let cumulative = 0;
  for (individual of generation) {
    const nextCumulative = cumulative + individual.fitness / generationFitness;
    if (nextCumulative >= draw) {
      return individual;
    }
    cumulative = nextCumulative;
  }
};
