import React, { useState } from 'react';
import './App.css';
import { utils } from "./Helpers/helpers";
import GameNumber from "./Components/GameNumber";
import StarDisplay from "./Components/StarDisplay";

function App() {
  
  const [stars, setStars] = useState(utils.random(1,9));

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
          <StarDisplay count={stars} />
        </div>
        <div className="right">
          {utils.range(1, 9).map(number => 
            <GameNumber key={number} number={number} />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: 10</div>
    </div>
    </div>
  );
}

export default App;
