import fs from "fs";

const stripNewLine = (input) => input.replace(/\r?\n|\r/g, "");

const distinct = (value, index, self) => self.indexOf(value) === index;

const intersection = (arrA, arrB) =>
  arrA.filter((element) => arrB.includes(element));

const difference = (arrA, arrB) =>
  arrA.filter((element) => !arrB.includes(element));

const union = (arrA, arrB) => [...new Set([...arrA, ...arrB])];

const readFile = (file) => fs.readFileSync(file, "utf-8");

const randomNumber = (max) => Math.floor(Math.random() * max);

const readFileAndSplit = (file) =>
  readFile(file)
    .split("\n")
    .map((line) => line.trimEnd());

const splitOnNewLine = (input) => input.split("\n");

const sumArray = (array) =>
  array.reduce((partialSum, item) => partialSum + Number(item), 0);

const confirmResult = (expected, value) =>
  console.log(
    `### Actual: ${value} equals ${expected}. ${value === expected} ###`
  );

const confirmTestResult = (expected, value) =>
  console.log(
    `### Test: ${value} equals ${expected}. ${value === expected} ###`
  );

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const arrayFill = (start, numberOfItems) =>
  Array.from({ length: numberOfItems }, (_, i) => i + start);

const arrayRange = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => i + start);

export {
  arrayFill,
  arrayRange,
  confirmResult,
  confirmTestResult,
  difference,
  distinct,
  intersection,
  randomNumber,
  readFile,
  readFileAndSplit,
  sleep,
  splitOnNewLine,
  stripNewLine,
  sumArray,
  union,
};
