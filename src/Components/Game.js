import React, { useState, useEffect } from 'react'
import { utils } from "../Helpers/helpers";
import GameNumber from "./GameNumber";
import StarDisplay from "./StarDisplay";
import PlayAgain from "./PlayAgain";

function Game({startNewGame}) {

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
        <div>
            <div className="game">
        <div className="help">
            Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
            <div className="left">
            {gamesStatus !== 'active' ? (
                <PlayAgain onClick={startNewGame} gamesStatus={gamesStatus}/>
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
    )
}

export default Game