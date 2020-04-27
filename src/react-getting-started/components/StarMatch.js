import React, { useState, useEffect } from "react";
import style from "../assets/StarMatch.module.css";

function StarsDisplay({ count }) {
  return (
    <>
      {utils.range(1, count).map((starId) => (
        <div key={starId} className={style.star} />
      ))}
    </>
  );
}

function PlayNumber({ id, status, onClick }) {
  return (
    <button
      className={style.number}
      style={{ backgroundColor: colors[status] }}
      onClick={() => onClick(id, status)}
    >
      {id}
    </button>
  );
}

function PlayAgain({ onClick, gameStatus }) {
  return (
    <div className={style.gameDone}>
      <div
        className={style.message}
        style={{ color: gameStatus === "won" ? "green" : "red" }}
      >
        {gameStatus === "won" ? "Congrats!" : "Game Over"}
      </div>
      <button onClick={onClick}>Play Again</button>
    </div>
  );
}

function useGameState() {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
  const [candidateNumbers, setCandidateNumbers] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNumbers.length > 0) {
      const timerID = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      // console.log(10 - secondsLeft + " seconds down");
      return () => clearTimeout(timerID); // Clean out the timer, not clear why this is needed
    }
    // console.log(10 - secondsLeft + " seconds down");
  }, [secondsLeft]);

  const setGameState = (newCandidateNumber) => {
    if (utils.sum(newCandidateNumber) !== stars) {
      setCandidateNumbers(newCandidateNumber);
    } else {
      const newAvailableNumber = availableNumbers.filter(
        (n) => !newCandidateNumber.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNumber, 9));
      setAvailableNumbers(newAvailableNumber);
      setCandidateNumbers([]);
    }
  };
  return {
    stars,
    availableNumbers,
    candidateNumbers,
    secondsLeft,
    setGameState,
  };
}

function Game({ title, startNewGame }) {
  const {
    stars,
    availableNumbers,
    candidateNumbers,
    secondsLeft,
    setGameState,
  } = useGameState();

  // Computatial clogic based on state
  const candidatesAreWrong = utils.sum(candidateNumbers) > stars;

  const gameStatus =
    availableNumbers.length === 0
      ? "won"
      : secondsLeft === 0
      ? "lost"
      : "active";

  const numberStatus = (number) => {
    if (!availableNumbers.includes(number)) {
      return "used";
    }
    if (candidateNumbers.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== "active" || currentStatus === "used") {
      return;
    }

    const newCandidateNumber =
      currentStatus === "available"
        ? candidateNumbers.concat(number)
        : candidateNumbers.filter((cn) => cn !== number);

    setGameState(newCandidateNumber);
  };
  document.querySelector("title").innerText = title.slice(2);

  return (
    <div className={style.game}>
      <h1 className={style.title}>{title}</h1>
      <div className={style.help}>
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className={style.body}>
        <div className={style.left}>
          {gameStatus !== "active" ? (
            <PlayAgain onClick={startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>

        <div className={style.right}>
          {utils.range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              status={numberStatus(number)}
              id={number}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className={style.timer}>Time Remaining: {secondsLeft}</div>
    </div>
  );
}

function StarMatch({ title }) {
  const [gameId, setGameId] = useState(1);
  return (
    <Game
      key={gameId}
      title={title}
      startNewGame={() => setGameId(gameId + 1)}
    />
  );
}

// Color Theme
const colors = {
  available: "lightgray",
  used: "lightgreen",
  wrong: "lightcoral",
  candidate: "deepskyblue",
};

// Math science
const utils = {
  // Sum an array
  sum: (arr) => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

export default StarMatch;
