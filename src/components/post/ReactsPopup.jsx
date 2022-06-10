import React, { useState } from 'react'

export default function ReactsPopup({visible, setVisible}) {

    const reactsArray = [
        {
            name: "like",
            image:"../../reacts/like.gif",
        },
        {
            name: "love",
            image:"../../reacts/love.gif",
        },
    ]


    return (
        <>
            { visible && (
                <div className="reacts-popup"
                onMouseOver={() => {
                    setTimeout(() => {
                        setVisible(true)
                    }, 500);
                  }}
                  onMouseLeave={() => {
                      setTimeout(() => {
                          setVisible(false)
                      }, 500);
                    }}
                >
                {
                    reactsArray.map((react, i) => (
                        <div className="react" key={i}><img src={react.image} alt="" /></div>
                    ))}   
                </div>
            )}
            </>
    )
}
