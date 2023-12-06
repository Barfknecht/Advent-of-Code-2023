import {
  arrayRange,
  confirmResult,
  confirmTestResult,
  readFileAndSplit,
} from "../utils.js";

const input = readFileAndSplit("./6/input.txt");
const testInput = readFileAndSplit("./6/test_input.txt");

const calculateRaceDistances = ({ time, record }) => {
  let end = time;
  let middle = end % 2 === 0 ? end / 2 : Math.floor(end / 2);
  const presses = arrayRange(1, middle);
  return presses
    .map((press) => (end - press) * press)
    .filter((distance) => distance > record);
};

const calculateNumberOfWaysToBeatRecord = (races) => {
  const recordBreakerDistances = races.map(calculateRaceDistances);
  return recordBreakerDistances
    .map((distances) =>
      distances.at(-1) % 2 === 0
        ? distances.length * 2
        : distances.length * 2 - 1
    )
    .reduce((total, numberOfRaces) => total * numberOfRaces);
};

// Part One

const prepareRaces = (input) => {
  const times = input[0].match(/(\d+)/g).map(Number);
  const records = input[1].match(/(\d+)/g).map(Number);
  return times.map((time, raceNumber) => {
    return { time, record: records[raceNumber] };
  });
};

let races = prepareRaces(testInput);
let total = calculateNumberOfWaysToBeatRecord(races);
confirmTestResult(288, total);

races = prepareRaces(input);
total = calculateNumberOfWaysToBeatRecord(races);
confirmResult(4403592, total);

// Part Two

const prepareRace = (input) => {
  const time = input[0].match(/(\d+)/g).join("");
  const record = input[1].match(/(\d+)/g).join("");
  return { time: Number(time), record: Number(record) };
};

races = [prepareRace(testInput)];
total = calculateNumberOfWaysToBeatRecord(races);
confirmTestResult(71503, total);

races = [prepareRace(input)];
total = calculateNumberOfWaysToBeatRecord(races);
confirmResult(38017587, total);
