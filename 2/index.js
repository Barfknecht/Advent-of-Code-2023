import "core-js";
import { max } from "mathjs";
import {
  confirmResult,
  confirmTestResult,
  readFileAndSplit,
  sumArray,
} from "../utils.js";

const input = readFileAndSplit("./2/input.txt");
const inputTest = readFileAndSplit("./2/input_test.txt");

const prepareGames = (input) => {
  const trimGame = (line) => line.replace(/Game \d+:/, "").trim();
  const regex = /(?<number>\d+)\s(?<colour>blue|red|green)/g;
  return input.map(trimGame).map((game) =>
    [...game.matchAll(regex)].map(({ groups }) => {
      return {
        colour: groups.colour,
        number: Number(groups.number),
      };
    })
  );
};

// Part One

const revealIsValid = ({ colour, number }) => {
  switch (colour) {
    case "red":
      return number <= 12;
    case "green":
      return number <= 13;
    case "blue":
      return number <= 14;
  }
};

const getValidGameIds = (games) =>
  games.map((reveal, index) => (reveal.every(revealIsValid) ? index + 1 : 0));

let games = prepareGames(inputTest);
let validGameIds = getValidGameIds(games);
let sum = sumArray(validGameIds);
confirmTestResult(8, sum);

games = prepareGames(input);
validGameIds = getValidGameIds(games);
sum = sumArray(validGameIds);
confirmResult(2268, sum);

// Part Two

const power = ({ red, green, blue }) => red * green * blue;

const getCubePowers = (games) =>
  games
    .map((reveal) => reveal.group((dice) => dice.colour))
    .map(({ red, green, blue }) => {
      return {
        red: max(...red.map((_) => _.number)),
        blue: max(...blue.map((_) => _.number)),
        green: max(...green.map((_) => _.number)),
      };
    })
    .map(power);

games = prepareGames(inputTest);
let cubePowers = getCubePowers(games);
sum = sumArray(cubePowers);
confirmTestResult(2286, sum);

games = prepareGames(input);
cubePowers = getCubePowers(games);
sum = sumArray(cubePowers);
confirmResult(63542, sum);
