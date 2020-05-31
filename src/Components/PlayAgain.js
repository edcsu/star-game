import React from 'react'

function PlayAgain({onClick, gamesStatus}) {
    return (
        <div className="game-done">
            <div
                style={{ color: gamesStatus === 'lost' ? 'red' : 'green'}} 
                className="message"
            >
                {gamesStatus === 'lost' ? 'Game Over!!!' : 'Well done'}
            </div>
            <button onClick={onClick}>Play Again</button>
        </div>
    )
}

export default PlayAgain
