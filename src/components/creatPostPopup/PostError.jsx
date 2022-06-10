import React from 'react'

export default function PostError({error, setError}) {
    return (
        <div className="postError">
            <div>
                {error}
                <button
                    className="pink-btn"
                    onClick={() => { setError("") }}> Try again</button>
            </div>
        </div>
    )
}
