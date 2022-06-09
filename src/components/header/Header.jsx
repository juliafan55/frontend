import React from 'react'
import "./header.css"
import {Link } from "react-router-dom"
import { Logo, Search } from '../../svg'

export default function Header() {
    
    return <header>
        <div className="header-left">
            <Link to="/">
                <div className="header-logo">
                    <p>dh.</p>
                </div>
            </Link>
            <div className="search search1">
                <Search />
                <input type="text" placeholder="Search Digital Hub" className="hide-input"></input>
            </div>
        </div>
        <div className="header-middle"></div>
        <div className="header-right"></div>
    </header>
}