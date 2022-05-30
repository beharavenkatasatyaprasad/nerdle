import React from 'react';
import Char from './Char';

export default function Attempt({
  currentIndex,
  setCurrentIndex,
  attempt,
  isCurrentAttempt,
  userGuess,
  backgroundClrs,
}) {
  return (
    <div className={'d-flex justify-content-center ' + (isCurrentAttempt ? 'current-attempt' : '')}>
      {[...Array(8).keys()].map((a) => (
        <Char
          setIndex={(value) => setCurrentIndex(value)}
          currentIndex={currentIndex}
          idx={a}
          bgclr={backgroundClrs[a]}
          userGuess={userGuess[a]}
          isCurrentAttempt={isCurrentAttempt}
          attempt={attempt}
          isFocussed={currentIndex === a}
          key={a + currentIndex + 'input'}
        />
      ))}
    </div>
  );
}
