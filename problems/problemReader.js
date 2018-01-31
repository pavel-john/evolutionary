// source: http://artemisa.unicauca.edu.co/~johnyortega/instances_01_KP/

const readline = require('readline');
const fs = require('fs');

const parseLine = line => {
  const nums = line.split(" ");
  return {
    first: parseInt(nums[0]),
    second: parseInt(nums[1]),
  }
};

const handleLine = problem => line => {
  if (problem.weightLimit < 0) {
    const parsedLine = parseLine(line);
    problem.weightLimit = parsedLine.second;
    problem.itemCount = parsedLine.first;
  } else if (problem.itemCount <= problem.items.length) {
    problem.solution = line;
  } else {
    const parsedLine = parseLine(line);
    problem.items.push({
      value: parsedLine.first,
      weight: parsedLine.second,
    });
  }
};

module.exports.readProblem = path => new Promise((resolve, reject) => {
  const reader = readline.createInterface({
    input: fs.createReadStream(path)
  });

  const problem = {
    weightLimit: -1,
    items: []
  };

  reader.on('line', handleLine(problem));
  reader.on('close', () => resolve(problem));
});






