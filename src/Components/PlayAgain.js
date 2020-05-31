import React from 'react'

function PlayAgain({onClick}) {
    return (
        <div className="game-done">
            <button onClick={onClick}>Play Again</button>
        </div>
    )
}

export default PlayAgain
