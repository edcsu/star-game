import React, { useState, useEffect } from 'react';
import './App.css';
import { utils } from "./Helpers/helpers";
import GameNumber from "./Components/GameNumber";
import StarDisplay from "./Components/StarDisplay";
import PlayAgain from "./Components/PlayAgain";

function App() {
  
  const [stars, setStars] = useState(utils.random(1,9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setcandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() =>{
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1)
      }, timeout);
    return () => clearTimeout(timerId)
    }
  })

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  const gamesStatus = availableNums.length === 0 
    ? 'won' 
    : secondsLeft === 0 ? 'lost' : 'active'
  
  const timeout = 1000

  const resetGame = () => {
    setStars(utils.random(1,9))
    setAvailableNums(utils.range(1,9))
    setcandidateNums([])
  }

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used'
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong? 'wrong' : 'candidate'
    }
    return 'available'
  }

  const onNumberClick = (number, currentStatus) => {
    if (gamesStatus !== 'active' || currentStatus === 'used') {
      return
    }
    const newCandidateNums = currentStatus === 'available' ? 
      candidateNums.concat(number) : candidateNums.filter(cn => cn !== number);
    if (utils.sum(newCandidateNums) !== stars) {
      setcandidateNums(newCandidateNums)
    } else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      )
      setStars(utils.randomSumIn(newAvailableNums, 9))
      setAvailableNums(newAvailableNums)
      setcandidateNums([])
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gamesStatus !== 'active' ? (
            <PlayAgain onClick={resetGame} gamesStatus={gamesStatus}/>
          ) : (
            <StarDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map(number => 
            <GameNumber
             key={number}
             number={number} 
             status={numberStatus(number)}
             onclick={onNumberClick}
            />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
    </div>
  );
}

export default App;
