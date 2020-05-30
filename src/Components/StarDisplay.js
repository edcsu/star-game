import React from 'react'
import { utils } from "../Helpers/helpers";

const StarDisplay = ({count}) => {
    return (
        <>
            {utils.range(1, count).map(starId => 
                <div key={starId} className="star" />          
            )}
        </>
    )
}

export default StarDisplay;