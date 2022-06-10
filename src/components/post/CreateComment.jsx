import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Picker from "emoji-picker-react"

export default function CreateComment({ user }) {
    const [picker, setPicker] = useState(false)
    const [text, setText] = useState("")
    const [cursorPosition, setCursorPosition] = useState();
    const textRef = useRef(null);

    useEffect(() => {
        textRef.current.selectionEnd = cursorPosition;
      }, [cursorPosition]);
    
      const handleEmoji = (e, { emoji }) => {
        const ref = textRef.current;
        ref.focus();
        const start = text.substring(0, ref.selectionStart);
        const end = text.substring(ref.selectionStart);
        const newText = start + emoji + end;
        setText(newText);
        setCursorPosition(start.length + emoji.length);
      };
    
    return (
        <div className="create-comment-wrap">
            <div className="create-comment">
                <img src={user.picture} alt="" />
                <div className="comment-input-wrap">
                    {
                        picker && <div className="comment-emoji-picker">
                            <Picker onEmojiClick={handleEmoji} />
                        </div>
                        
                    }
                    <input type="file" hidden />
                    <input type="text"
                        ref={textRef}
                        placeholder="Write a comment..."
                        value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="comment-circle-icon" onClick={()=>{setPicker((prev) => !prev )}}>
                    <i className="emoji_icon"></i>
                </div>
            </div>
        </div>
    )
}
