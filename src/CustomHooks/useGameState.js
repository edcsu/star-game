import { useState, useEffect } from 'react'
import { utils } from "../Helpers/helpers";

const useGameState = () =>{
    const [stars, setStars] = useState(utils.random(1,9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setcandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    const timeout = 1000

    useEffect(() =>{
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
            setSecondsLeft(secondsLeft - 1)
            }, timeout);
        return () => clearTimeout(timerId)
        }
    })

    const setGameState = (newCandidateNums) =>{
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

    return  {stars, availableNums, candidateNums, secondsLeft, setGameState} 
}

export default useGameState
