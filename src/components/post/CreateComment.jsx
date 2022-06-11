import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Picker from "emoji-picker-react"
import { comment } from "../../helpers/post"
import {ClipLoader} from "react-spinners"

export default function CreateComment({ postId, user, setCount, setComments, token }) {
    const [picker, setPicker] = useState(false)
    const [text, setText] = useState("")
    const [cursorPosition, setCursorPosition] = useState();
    const [loading, setLoading] = useState(false)
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
    
    const handleComments = async (e) => {
        if (e.key === "Enter") {
            setLoading(true)
            const comments = await comment(postId, text, "", user.token);
            setComments(comments);
            setCount((prev) => ++prev)
            setLoading(false)
            setText("")
        }
    }
    
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
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyUp={handleComments} />
                    <div className="comment-circle">
                        <ClipLoader size={20} color="#f582ae" loading={loading}/>
                    </div>
                </div>
                <div className="comment-circle-icon" onClick={()=>{setPicker((prev) => !prev )}}>
                    <i className="emoji_icon"></i>
                </div>
            </div>
        </div>
    )
}


