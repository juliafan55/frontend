import React from 'react'

export default function MenuItem({ icon, title }) {
    return (
        <li className="hover-blue">
            <i className={icon}></i>
            <div className="post-menu-text">
                <span>{title}</span>
            </div>
        </li>
    )
}
