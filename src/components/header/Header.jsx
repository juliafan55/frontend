import React, { useState } from 'react'
import "./header.css"
import {Link } from "react-router-dom"
import { HomeActive, Search, Friends, Messenger, Menu, Notifications, ArrowDown } from '../../svg'
import { useSelector } from 'react-redux'
import SearchMenu from './SearchMenu'

export default function Header() {
    const { user } = useSelector((user) => ({ ...user }));
    const color = "#001858";
    const [showSearchMenu, setShowSearchMenu] = useState(false);
    
    return <header>
        <div className="header-left" >
            <Link to="/">
                <div className="header-logo">
                    <p>dh.</p>
                </div>
            </Link>
            <div className="search search1" onClick={() => {setShowSearchMenu(true)
          }}>
                <Search color={color}/>
                <input type="text" placeholder="Search Digital Hub" className="hide-input"></input>
            </div>
            </div>
            {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
        <div className="header-middle">
            <Link to="/" className="middle-icon hover-pink">
                <HomeActive color={color} />
            </Link>
            <Link to="/" className="middle-icon hover-pink">
                <Friends color={color} />
                <div className="middle-notification">4+</div>
            </Link>
            
        </div>
        <div className="header-right">
            <Link to="/profile" className="profile-link hover-pink">
                <img src={user?.picture} alt="profile" />
                <span>{user?.first_name}</span>
            </Link>
            <div className="circle-icon hover-pink">
                <Menu />
            </div>
            <div className="circle-icon hover-pink">
                <Messenger />
            </div>
            <div className="circle-icon hover-pink">
                <ArrowDown />
            </div>
        </div>
    </header>
}