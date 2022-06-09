import React, { useRef } from 'react'
import { Return, Search } from '../../svg'
import useClickOutside from '../../helpers/clickOutside'

export default function SearchMenu({color, setShowSearchMenu}) {
    const menu = useRef(null)
    useClickOutside(menu, () => {
        setShowSearchMenu(false);
      });

    return (
        <div className="header-left search-area scrollbar" ref={menu}>
            <div className="search-wrap">
                <div className="header-logo">
                    <div className="circle pink-hover" onClick={() => {
              setShowSearchMenu(false);
            }}>
                        <Return />
                    </div>
                </div>
                <div className="search">
                    <div>
                        <Search color={color}/>
                    </div>
                    <input type="text" placeholder="Search Digital Hub" />
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
