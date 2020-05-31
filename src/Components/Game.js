import React from 'react'
import { utils } from "../Helpers/helpers";
import GameNumber from "./GameNumber";
import StarDisplay from "./StarDisplay";
import PlayAgain from "./PlayAgain";
import useGameState from "../CustomHooks/useGameState";

function Game({startNewGame}) {

    const { 
        stars,
        availableNums,
        candidateNums, 
        secondsLeft, 
        setGameState
    } = useGameState();

    const candidatesAreWrong = utils.sum(candidateNums) > stars;

    const gamesStatus = availableNums.length === 0 
        ? 'won' 
        : secondsLeft === 0 ? 'lost' : 'active'

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
            
        setGameState(newCandidateNums)
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
