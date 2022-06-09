import React from 'react'
import { Return, Search } from '../../svg'

export default function SearchMenu({color}) {
    


    return (
        <div className="header-left search-area scrollbar">
            <div className="search-wrap">
                <div className="header-logo">
                    <div className="circle pink-hover">
                        <Return />
                    </div>
                </div>
                <div className="search">
                    <div>
                        <Search color={color}/>
                    </div>
                    <input type="text" placeholder="Search Facebook" />
                </div>
            </div>
            <div className="search-history-header">
                <span> Recent searches</span>
                <a>Edit</a>
            </div>
            <div className="seach-history">
                <div className="search-results scrollbar">

                </div>
            </div>
        </div>
    )
}
