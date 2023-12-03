import "core-js";
import { max } from "mathjs";
import {
  confirmResult,
  confirmTestResult,
  readFile,
  splitOnNewLine,
  sumArray,
} from "../utils.js";

const input = readFile("./2/input.txt");
const regex = /(?<number>\d+) (?<colour>blue|red|green)/g;
const trimGame = (line) => line.replace(/Game \d+:/, "").trim();

const prepareGames = (input) =>
  input.map(trimGame).map((game) =>
    [...game.matchAll(regex)].map(({ groups }) => {
      return {
        colour: groups.colour,
        number: Number(groups.number),
      };
    })
  );

const test = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

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

const testGames = prepareGames(splitOnNewLine(test));
let validGameIds = getValidGameIds(testGames);
let sum = sumArray(validGameIds);
confirmTestResult(8, sum);

const games = prepareGames(input);
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

let cubePowers = getCubePowers(testGames);
sum = sumArray(cubePowers);
confirmTestResult(2286, sum);

cubePowers = getCubePowers(games);
sum = sumArray(cubePowers);
confirmResult(63542, sum);
