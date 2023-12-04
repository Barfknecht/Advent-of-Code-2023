import {
  confirmResult,
  confirmTestResult,
  distinct,
  intersection,
  readFileAndSplit,
  sumArray,
} from "../utils.js";

const input = readFileAndSplit("./3/input.txt");
const testInput = readFileAndSplit("./3/test_input.txt");

// Part One

const getColumns = (value, index) =>
  value.length > 1 ? [...value.split("").map((_, i) => index + i)] : index;

const loadLocations = (input, regex) =>
  input.flatMap((line, row) =>
    [...line.matchAll(regex)].map(({ index, groups }) => {
      return {
        id: crypto.randomUUID(),
        value: groups.value,
        row: row,
        columns: getColumns(groups.value, index),
      };
    })
  );

const loadEngineSchematic = (input) => {
  const partNumberRegex = /(?<value>\d+)/g;
  const symbolRegex = /(?<value>[^\d^.^\n])/g;

  const symbolLocations = loadLocations(input, symbolRegex);
  const partNumberLocations = loadLocations(input, partNumberRegex);

  return { partNumberLocations, symbolLocations };
};

const getPartNumbersCloseToRow = (row, partNumberLocations) =>
  partNumberLocations.filter((location) => {
    const aroundSymbol = [row - 1, row, row + 1];
    return aroundSymbol.includes(location.row);
  });
const getPartNumbersCloseToColumn = (column, partNumberLocations) =>
  partNumberLocations.filter(({ columns }) => {
    const aroundSymbol = [column - 1, column, column + 1];
    if (!Array.isArray(columns)) columns = [columns];
    return intersection(aroundSymbol, columns).length > 0;
  });

const getPartNumbers = ({ symbolLocations, partNumberLocations }) =>
  symbolLocations
    .map(({ row, columns }) => {
      const closePartNumbersByRow = getPartNumbersCloseToRow(
        row,
        partNumberLocations
      );

      const closePartNumbersByColumn = getPartNumbersCloseToColumn(
        columns,
        closePartNumbersByRow
      );

      return closePartNumbersByColumn.filter((col) =>
        closePartNumbersByRow.some((row) => col.value === row.value)
      );
    })
    .filter(distinct);

let engineSchematic = loadEngineSchematic(testInput);
let partNumbers = getPartNumbers(engineSchematic).flat();
let sum = sumArray(partNumbers.map(({ value }) => value));
confirmTestResult(4361, sum);

engineSchematic = loadEngineSchematic(input);
partNumbers = getPartNumbers(engineSchematic).flat();
sum = sumArray(partNumbers.map(({ value }) => value));
confirmResult(521515, sum);

// Part Two

const getGears = (symbolLocations) =>
  symbolLocations.filter(({ value }) => value === "*");

const calculateGearRatios = (gears, partNumberLocations) => {
  let partNumbers = getPartNumbers({
    symbolLocations: gears,
    partNumberLocations,
  });
  partNumbers = partNumbers.filter((gears) => gears.length === 2);
  return partNumbers.map(
    ([partNumber1, partNumber2]) =>
      Number(partNumber1.value) * partNumber2.value
  );
};

let { symbolLocations, partNumberLocations } = loadEngineSchematic(testInput);
let gears = getGears(symbolLocations);
let gearRations = calculateGearRatios(gears, partNumberLocations);
sum = sumArray(gearRations);
confirmTestResult(467835, sum);

({ symbolLocations, partNumberLocations } = loadEngineSchematic(input));
gears = getGears(symbolLocations);
gearRations = calculateGearRatios(gears, partNumberLocations);
sum = sumArray(gearRations);
confirmResult(69527306, sum);
