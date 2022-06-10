import React from 'react'
import "./createPost.css"
import { Feeling, LiveVideo, Photo } from '../../svg'

export default function CreatePost({user, setVisible}) {
    return (
        <div className="create-post">
            <div className="create-post-header">
                <img src={user?.picture} alt="" />
                <div
                    className="open-post hover-blue"
                    onClick={() => { setVisible(true) }}>
                    What's on your mind, {user?.first_name}
                </div>
            </div>

            <div className="create-splitter"></div>
            
            <div className="create-post-body">
                <div className="create-post-icon hover-pink">
                    <LiveVideo /> Live Chat
                </div>
                <div className="create-post-icon hover-pink">
                    <Photo /> Post Photos
                </div>
                <div className="create-post-icon hover-pink">
                    <Feeling /> Feelings
                </div>
            </div>
        </div>
    )
}
