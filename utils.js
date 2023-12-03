import fs from "fs";

const readFile = (file) => fs.readFileSync(file, "utf-8").split("\n");

const splitOnNewLine = (input) => input.split("\n");

const sumArray = (array) =>
  array.reduce((partialSum, item) => partialSum + Number(item), 0);

const confirmResult = (expected, value) =>
  console.log(`Test: ${value} equals ${expected}. ${value === expected}`);

export { confirmResult, readFile, splitOnNewLine, sumArray };
