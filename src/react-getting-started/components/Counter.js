import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div>Hello from Counter</div>
      <p>
        <button onClick={() => setCounter(counter + 1)}>{counter}</button>
      </p>
    </>
  );
};

export default Counter;
