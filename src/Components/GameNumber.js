import React from 'react'

const GameNumber = ({number}) => {
    return (
        <button className="number" onClick={() => console.log(number)}>
            {number}
        </button>
    )
}

export  default GameNumber;