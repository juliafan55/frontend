import "./createPostPopup.css"
import { useEffect, useState } from "react"
import Picker from "emoji-picker-react"
import { useRef } from "react"
import EmojiPicker from "./EmojiPicker"
import AddToYourPost from "./AddToYourPost"
import ImagePreview from "./ImagePreview"
import useClickOutside from "../../helpers/clickOutside"
import { createPost } from "../../helpers/createPost"
import PulseLoader from "react-spinners/PulseLoader"
import PostError from "./PostError"
import dataURItoBlob from "../../helpers/dataURItoBlob"
import { uploadImages } from "../../helpers/uploadImages"

export default function CreatePostPopup({ user, setVisible }) {
    const popup = useRef(null)
    const [text, setText] = useState("")
    const [showPreview, setShowPreview] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [images, setImages] = useState([])
    const [background, setBackground] = useState("")
    
    
    const textRef = useRef(null)
    
    useClickOutside(popup, () => {
        setVisible(false)
    })

    const postSubmit = async () => {
        if (background) {
          setLoading(true);
          const response = await createPost(
            null,
            background,
            text,
            null,
            user.id,
            user.token
          );
          setLoading(false);
          if (response === "ok") {
            setBackground("");
            setText("");
            setVisible(false);
          } else {
            setError(response);
          }
        } else if (images && images.length) {
          setLoading(true);
          const postImages = images.map((img) => {
            return dataURItoBlob(img);
          });
          const path = `${user.username}/post_images`;
          let formData = new FormData();
          formData.append("path", path);
          postImages.forEach((image) => {
            formData.append("file", image);
          });
          const response = await uploadImages(formData, path, user.token);
    
          const res = await createPost(
            null,
            null,
            text,
            response,
            user.id,
            user.token
          );
          setLoading(false);
          if (res === "ok") {
            setText("");
            setImages("");
            setVisible(false);
          } else {
            setError(res);
          }
        } else if (text) {
          setLoading(true);
          const response = await createPost(
            null,
            null,
            text,
            null,
            user.id,
            user.token
          );
          setLoading(false);
          if (response === "ok") {
            setBackground("");
            setText("");
            setVisible(false);
          } else {
            setError(response);
          }
        } else {
          console.log("nothing");
        }
      };

    return (
        <div className="blur">
            <div className="post-box" ref={popup}>
                {error && <PostError error={error} setError={setError} />}
                <div className="box-header">
                    <div className="small-circle"
                        onClick={() => {
                            setVisible(false)
                        }}>
                        
                        <i className="exit_icon"></i>
                    </div>
                    <span> Create Post</span>
                </div>

                <div className="box-profile">
                    <img src={user.picture} alt="" className="box-profile-img"/>
                    <div className="box-col">
                        <div className="box-profile-name">
                            {user.first_name} {user.last_name}
                        </div>
                    </div>
                </div>
                
                {!showPreview ? (
                    <>
                        <EmojiPicker
                            text={text}
                            user={user}
                            setText={setText}
                            showPreview={showPreview}
                            setBackground={setBackground}
                            background={background}
                        />
                    </>
                ) : (
                        <ImagePreview
                            text={text}
                            user={user}
                            setText={setText}
                            showPreview={showPreview}
                            images={images}
                            setImages={setImages}
                            setShowPreview={setShowPreview}
                            setError={setError}
                        />
                )}
                <AddToYourPost setShowPreview={setShowPreview} />
                <button
                    className="post-submit"
                    onClick={() => {
                        postSubmit()
                    }}
                    disabled={loading}
                >
                    {loading ? <PulseLoader size={5} /> : "Post"}
                </button>
            </div>
        </div>
    )
}


                    // {/* <div className="flex-center">
                    //     <textarea
                    //         ref={textRef}
                    //         maxLength="100"
                    //         value={text}
                    //         placeholder={`What's on your mind, ${user.first_name}`}
                    //         className="post-input"
                    //         onChange={(e) => setText(e.target.value)}></textarea>
                    // </div>
                    //     <EmojiPicker text={text} setText={setText} user={user} showPreview={showPreview}/> */}
                    {/* </> */}
                {/* ) : (<ImagePreview text={text}
                    user={user}
                    setText={setText}
                    showPreview={showPreview}/>) } */}

