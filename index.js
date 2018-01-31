const Random = require('./helpers/random');
const Config = require('./config');
const CONST = require('./constants');
// genetic operators
const selection = require('./operators/selection').default;
const crossover = require('./operators/crossover').default;
const mutation = require('./operators/mutation').default;
// problem definition (input)
const PicnicProblem = require('./problems/picnicProblem').default;

const getRandomGenome = genomeLength => Random.array(genomeLength, 0, 1);

const randomizeInitialGeneration = (problem, generationSize) => {
  const generation = [];
  for (let count = 0; count < generationSize; ++count) {
    generation.push({
      genome: getRandomGenome(problem.items.length),
      fitness: CONST.FITNESS_UNKNOWN,
    });
  }
  return generation;
}

const getFitnessFunction = problem => genome => {
  let individualValue = 1;
  // calculate total weight
  let individualWeight = 0;
  for (let itemIndex = 0; itemIndex < problem.items.length; ++itemIndex) {
    individualWeight += genome[itemIndex] ? problem.items[itemIndex].weight : 0;
  }
  // overweight are not fit
  if (individualWeight > problem.weightLimit) {
    return individualValue;
  }
  // calculate total value
  for (let itemIndex = 0; itemIndex < problem.items.length; ++itemIndex) {
    individualValue += genome[itemIndex] ? problem.items[itemIndex].value : 0;
  }
  return individualValue;
}

const runEvolution = (problem) => {
  // Construct fitness function for a given problem
  const fitnessFunction = getFitnessFunction(problem);
  // Initialize the first generation
  let currentGeneration = randomizeInitialGeneration(problem, Config.populationSize);
  // Initial record holder
  let bestIndividual = {
    fitness: CONST.FITNESS_UNKNOWN,
    genome: []
  }

  // Evolution loop
  for (let generationOrder = 0; generationOrder < Config.maxGenerations; ++generationOrder) {
    // evaluate each individual of the current generation
    let generationFitness = 0;
    for (individual of currentGeneration) {
      individual.fitness = fitnessFunction(individual.genome);
      generationFitness += individual.fitness;
      // Remember record holder
      if (individual.fitness > bestIndividual.fitness) {
        bestIndividual = individual;
      }
    }
    console.log(`Generation fitness: ${generationFitness}   Fittest individual: ${bestIndividual.fitness}`);
    // produce next generation
    const nextGeneration = [];
    for (let generationSize = 0; generationSize < Config.populationSize; ++generationSize) {
      // selection
      const parent1 = selection(currentGeneration, generationFitness);
      const parent2 = selection(currentGeneration, generationFitness);
      // crossover
      const parentCombination = crossover(parent1, parent2);
      // mutation
      const offspring = mutation(parentCombination, Config.mutationRate);
      // next generation member
      nextGeneration.push(offspring);
    }
    // generation change
    currentGeneration = nextGeneration;
  }

  return bestIndividual;
}

const bestFound = runEvolution(PicnicProblem);
console.log('Best solution found: ', bestFound.genome, ' has value:', bestFound.weight);

// tip: stopping condition based on fitness
// tip: elitism
