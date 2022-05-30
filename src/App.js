import React, { useState, useEffect } from 'react';
import Attempt from './Attempt';
import config from './config.json';
function App() {
  const [attempt, setAttempt] = useState(0);

  const [equation, setEquation] = useState(() => {
    let randomEqn = config.set_of_questions[Math.floor(Math.random() * config.set_of_questions.length)].split('');
    return randomEqn;
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const [userGuess, setUserGuess] = useState(() => {
    let obj = {};
    let attempts = [...Array(config.no_of_attempts).keys()];
    attempts.forEach(function (prop, index) {
      obj[index] = [];
    });
    return obj;
  });

  const [btnThemes, setBtnThemes] = useState(() => {
    let obj = {};
    let attempts = [...Array(10).keys(), '+', '/', '*', '-', '='].map((a) => a + '');
    attempts.forEach(function (prop) {
      obj[`${prop}`] = 'btn-outline-primary';
    });

    console.log(obj);
    return obj;
  });

  const [backgroundClrs, setBackgroundClrs] = useState(() => {
    let obj = {};
    let attempts = [...Array(config.no_of_attempts).keys()];
    attempts.forEach(function (prop, index) {
      obj[index] = [null, null, null, null, null, null, null, null];
    });
    return obj;
  });

  const handleEvaluateAttempt = () => {
    let eqnarr = equation;

    let guessEqn = userGuess[attempt];

    let bgClrsCpy = backgroundClrs;
    let clrs = [];

    let btnThemesCpy = btnThemes;
    guessEqn.forEach((a, idx) => {
      clrs[idx] = 'dark';

      if (a === eqnarr[idx]) {
        clrs[idx] = 'success';
      }

      let isAtIndex = eqnarr.indexOf(a);
      if (isAtIndex && clrs[isAtIndex] !== 'success') {
        clrs[isAtIndex] = 'info';
      }
    });
    bgClrsCpy[attempt] = clrs;
    setAttempt((prev) => prev + 1);
    setBtnThemes(btnThemesCpy);
    setCurrentIndex(0);
  };

  const handleGuessInput = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    let userGuessCpy = userGuess;
    userGuessCpy[attempt][currentIndex] = value;
    setUserGuess(userGuessCpy);
    setCurrentIndex((prev) => (prev < 8 ? prev + 1 : prev));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    let userGuessCpy = userGuess;
    userGuessCpy[attempt][currentIndex] = null;
    setUserGuess(userGuessCpy);
    setCurrentIndex((prev) => (prev < 8 ? prev + 1 : prev));
  };

  useEffect(() => {
    console.log(btnThemes);
  }, [btnThemes]);

  return (
    <div className='container'>
      <div className='mt-5'></div>
      {[...Array(config.no_of_attempts).keys()].map((a) => (
        <Attempt
          currentIndex={currentIndex}
          userGuess={userGuess[a]}
          attempt={attempt}
          backgroundClrs={backgroundClrs[+a]}
          setCurrentIndex={(value) => setCurrentIndex(value)}
          isCurrentAttempt={attempt === a}
          key={a + 'attempt'}
        />
      ))}
      <div className='d-flex justify-content-center my-3'>
        {[...Array(10).keys()].map((a, idx) => (
          <button className={'btn mx-1 ' + btnThemes[a + '']} onClick={handleGuessInput} key={idx + 'btn'}>
            {a}
          </button>
        ))}
      </div>
      <div className='d-flex justify-content-center my-3'>
        {['+', '/', '*', '-', '='].map((a, idx) => (
          <button onClick={handleGuessInput} key={idx + 'btn'} className={'btn mx-1 ' + btnThemes[a + '']}>
            {a}
          </button>
        ))}
        <button onClick={handleEvaluateAttempt} className='btn btn-outline-success mx-1'>
          Enter
        </button>
        <button onClick={handleDelete} className='btn btn-outline-danger mx-1'>
          Delete
        </button>
      </div>
    </div>
  );
}

export default App;
