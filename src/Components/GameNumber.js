import React from 'react'
import { colors } from "../Helpers/helpers";

const GameNumber = ({number, status}) => {
    return (
        <button 
            className="number" 
            style={{ backgroundColor: colors[status]}}
            onClick={() => console.log(number)}
        >
            {number}
        </button>
    )
}

export  default GameNumber;