import React from 'react'
import "./homeRight.css"
import { NewRoom, Search, Dots } from '../../../svg'
import Contact from './Contact'

export default function HomeRight({user}) {
    return (
        <div className="right-home">
            <div className="heading"> Sponsored </div>
            <div className="splitter1"></div>
            <div className="contacts-wrap">
                <div className="contacts-header">
                    <div className="contacts-header-left"> Contacts </div>
                    <div className="contacts-header-right">
                        <div className="contact-circle hover-blue">
                            <NewRoom />
                        </div>
                        <div className="contact-circle hover-blue">
                            <Search />
                        </div>
                        <div className="contact-circle hover-blue">
                            <Dots />
                        </div>
                    </div>
                </div>
                <div className="contacts-list">
                    <Contact user={user}/>
                </div>
            </div>
        </div>
    )
}
