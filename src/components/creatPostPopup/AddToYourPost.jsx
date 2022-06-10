import React from 'react'
import { Photo, Dots, Feeling } from '../../svg'

export default function AddToYourPost({setShowPreview}) {
    return (
        <div className="addtoyourpost">
            <div className="addto-text">Add to your post</div>
            <div
                className="post-header-right hover-pink"
                onClick={() => {
                setShowPreview(true);
                }}
            >
                <Photo color="#8bd3dd"/>
            </div>

            <div className="post-header-right hover-blue">
                <i className="tag_icon"></i>
            </div>
            <div className="post-header-right hover-blue">
                <Feeling />
            </div>
            <div className="post-header-right hover-blue">
                <i className="maps_icon"></i>
            </div>
            <div className="post-header-right hover-blue">
                <i className="microphone_icon"></i>
            </div>
            <div className="post-header-right hover-blue">
                <Dots />
            </div>
        </div>
    )
}
