import fs from "fs";

const stripNewLine = (input) => input.replace(/\r?\n|\r/g, "");

const distinct = (value, index, self) => self.indexOf(value) === index;

const intersection = (arrA, arrB) =>
  arrA.filter((element) => arrB.includes(element));

const difference = (arrA, arrB) =>
  arrA.filter((element) => !arrB.includes(element));

const readFile = (file) => fs.readFileSync(file, "utf-8");

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

export {
  confirmResult,
  confirmTestResult,
  difference,
  distinct,
  intersection,
  readFile,
  readFileAndSplit,
  sleep,
  splitOnNewLine,
  stripNewLine,
  sumArray,
};
