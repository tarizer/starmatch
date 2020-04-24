import React, { useState } from "react";
import style from "../assets/StarMatch.module.css";

function StarsDisplay({ stars }) {
  return (
    <>
      {utils.range(1, stars).map((starId) => (
        <div key={starId} className={style.star} />
      ))}
    </>
  );
}

function ButtonDigit({ id }) {
  return (
    <button id={id} className={style.number}>
      {id}
    </button>
  );
}

function StarMatch({ title }) {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 5));
  const [candidateNumbers, setCandidateNumbers] = useState(utils.range(2, 3));

  const numberStatus = (number) => {
    if (!availableNumbers.includes(number)) {
      return "used";
    }
    if (!candidateNumbers.includes(number)) {
      return "...";
    }
    return "available";
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
          <StarsDisplay stars={stars} />
        </div>

        <div className={style.right}>
          {utils.range(1, 9).map((buttonId) => (
            <ButtonDigit key={buttonId} id={buttonId} />
          ))}
        </div>
      </div>
      <div className={style.timer}>Time Remaining: 10</div>
    </div>
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
