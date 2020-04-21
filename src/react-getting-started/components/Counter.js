import React, { useState } from "react";

const Button = ({ onClickFunction, increment }) => {
  const handleClick = () => onClickFunction(increment);

  return (
    <button type="submit" onClick={handleClick}>
      {increment}
    </button>
  );
};

function Display({ message }) {
  document.querySelector("title").innerText = `Simple counter: ${message}`;

  return (
    <>
      <p>
        <span aria-label="React emoji" role="img">
          ⚛️
        </span>
        Hello from Counter: {message}
      </p>
    </>
  );
}

function Counter() {
  const [counter, setCounter] = useState(0);
  const incrementCounter = (incrementValue) =>
    setCounter(counter + incrementValue);

  return (
    <>
      <Button onClickFunction={incrementCounter} increment={-10} />
      <Button onClickFunction={incrementCounter} increment={-5} />
      <Button onClickFunction={incrementCounter} increment={-1} />
      <Button onClickFunction={incrementCounter} increment={1} />
      <Button onClickFunction={incrementCounter} increment={5} />
      <Button onClickFunction={incrementCounter} increment={10} />
      <Display message={counter} />
    </>
  );
}

export default Counter;
