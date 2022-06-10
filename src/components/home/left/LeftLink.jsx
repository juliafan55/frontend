import React from 'react'

export default function LeftLink({img, text, notification}) {
    return (
        <div className="left-link">
            <img src={`../../../left/${img}.png`} alt="" />
        </div>
    )
}
