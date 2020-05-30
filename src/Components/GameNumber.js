import React from 'react'
import { colors } from "../Helpers/helpers";

const GameNumber = ({number, status, onclick}) => {
    return (
        <button 
            className="number" 
            style={{ backgroundColor: colors[status]}}
            onClick={() => onclick(number, status)}
        >
            {number}
        </button>
    )
}

export  default GameNumber;