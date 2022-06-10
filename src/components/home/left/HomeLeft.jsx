import React from 'react'
import "./homeLeft.css"
import LeftLink from './LeftLink'

export default function HomeLeft({user}) {
    return (
        <div className="left-home">
            <div className="left-link">
                {/* <img src={user?.picture} alt="" />
                <span>
                    {user?.first_name} {user.last_name}
                </span> */}
            </div>
            <LeftLink />
        </div>
    )
}
