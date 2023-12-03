import {
  confirmResult,
  confirmTestResult,
  readFile,
  splitOnNewLine,
  sumArray,
} from "../utils.js";

const input = readFile("./1/input.txt");

const mapToNumber = (digit) => {
  switch (digit) {
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
    case "nine":
      return 9;
    default:
      return Number(digit);
  }
};

const getCalibrationValues = (document, regex) =>
  document.map((line) => {
    const [matches] = [...line.matchAll(regex)];
    const [_, group1, group2, group3, ...__] = matches;
    return group3
      ? `${mapToNumber(group3)}${mapToNumber(group3)}`
      : `${mapToNumber(group1)}${mapToNumber(group2)}`;
  });

// Part One

let test = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

let regex = new RegExp(/^.*?(\d).*(\d)|(\d)/g);

let calibrationValues = getCalibrationValues(splitOnNewLine(test), regex);
let sum = sumArray(calibrationValues);
confirmTestResult(142, sum);

calibrationValues = getCalibrationValues(input, regex);
sum = sumArray(calibrationValues);
confirmResult(54388, sum);

// Part Two

test = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const captureGroup = "(zero|one|two|three|four|five|six|seven|eight|nine|\\d)";
regex = new RegExp(`^.*?${captureGroup}.*${captureGroup}.*|(\\d)`, "gm");

calibrationValues = getCalibrationValues(splitOnNewLine(test), regex);
sum = sumArray(calibrationValues);
confirmTestResult(281, sum);

calibrationValues = getCalibrationValues(input, regex);
sum = sumArray(calibrationValues);
confirmResult(53515, sum);
