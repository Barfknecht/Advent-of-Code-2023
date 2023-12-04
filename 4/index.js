import {
  confirmResult,
  confirmTestResult,
  distinct,
  intersection,
  readFileAndSplit,
} from "../utils.js";

const input = readFileAndSplit("./4/input.txt");
const testInput = readFileAndSplit("./4/test_input.txt");

const loadScratchCards = (input) => {
  let cardRegex = /(?:Card\s+\d+:)(?<winning>(?:.*))\|(?<numbers>(?:.*))/g;

  return input.map((line, index) => {
    let [{ groups }] = [...line.matchAll(cardRegex)];

    let winningNumbers = groups.winning.trim().split(/\s+/g).filter(distinct);
    let myNumbers = groups.numbers.trim().split(/\s+/g).filter(distinct);
    return {
      card: index + 1,
      winning: winningNumbers,
      numbers: myNumbers,
    };
  });
};

const getMyWinningNumbers = (winning, numbers) =>
  intersection(winning, numbers);

// Part One

const getTotalPoints = (card) =>
  card.reduce((points, { winning, numbers }) => {
    const winningNumbers = getMyWinningNumbers(winning, numbers);
    return winningNumbers.length > 0
      ? points + Math.pow(2, winningNumbers.indexOf(winningNumbers.at(-1)))
      : points;
  }, 0);

let scratchCards = loadScratchCards(testInput);
let totalPoints = getTotalPoints(scratchCards);
confirmTestResult(13, totalPoints);

scratchCards = loadScratchCards(input);
totalPoints = getTotalPoints(scratchCards);
confirmResult(21138, totalPoints);

// Part Two

const getMyWinningScratchCards = (input) =>
  loadScratchCards(input).map(({ card, winning, numbers }) => {
    return {
      card: card,
      myWinningNumbersCount: getMyWinningNumbers(winning, numbers).length,
    };
  });

const getCopies = (originalCards, copyCards, copyTotal) => {
  if (copyCards.length === 0) return copyTotal;

  const copies = copyCards
    .flatMap(({ myWinningNumbersCount, card }) => {
      const start = card;
      const end = start + myWinningNumbersCount;
      return originalCards.slice(start, end);
    })
    .filter((card) => card);
  return getCopies(originalCards, copies, copyTotal + copies.length);
};

scratchCards = getMyWinningScratchCards(testInput);
let total = getCopies(scratchCards, scratchCards, scratchCards.length);
confirmTestResult(30, total);

scratchCards = getMyWinningScratchCards(input);
total = getCopies(scratchCards, scratchCards, scratchCards.length);
confirmResult(7185540, total);
