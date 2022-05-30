import React from 'react';

export default function Char({ isFocussed, setIndex, idx, bgclr, userGuess }) {
  console.log(bgclr);
  return (
    <div
      onClick={(e) => {
        setIndex(idx);
      }}
      className={`input-div rounded bg-${bgclr} ` + (isFocussed ? 'focussed ' : '')}
    >
      {userGuess}
    </div>
  );
}
