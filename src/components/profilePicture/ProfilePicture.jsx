import React, { useRef, useState } from 'react'
import "./profilePicture.css"
import UpdateProfilePicture from './UpdateProfilePicture'


export default function ProfilePicture() {
    const refInput = useRef(null)
    const [image, setImage] = useState("")
    const [error, setError] = useState("")

    const handleImage = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((img) => {
          if (
            img.type !== "image/jpeg" &&
            img.type !== "image/png" &&
            img.type !== "image/webp" &&
            img.type !== "image/gif"
          ) {
            setError(
              `${img.name} format is unsupported ! only Jpeg, Png, Webp, Gif are allowed.`
            );
            files = files.filter((item) => item.name !== img.name);
            return;
          } else if (img.size > 1024 * 1024 * 5) {
            setError(`${img.name} size is too large max 5mb allowed.`);
            files = files.filter((item) => item.name !== img.name);
            return;
          } else {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = (readerEvent) => {
              setImage((images) => [...images, readerEvent.target.result]);
            };
          }
        });
    };
    
    return (
        <div className="blur">
            <input type="file" ref={refInput} hidden onChange={handleImage} accept="image/jpeg, image/png, image/webp, image/gif" />
            <div className="post-box picture-box">
                <div className="box-header">
                    <div className="small-circle">
                        <i className="exit_icon"></i>
                    </div>
                    <span>Update profile picture</span>
                </div>
                <div className="update-picture-wrap">
                    <div className="update-picture-buttons">
                        <button className="pink-btn" onClick={() => refInput.current.click()}>
                            <i className="plus_icon"></i>
                            Upload photo
                        </button>
                        <button className="pink-btn">
                            <i className="frame_icon"></i>
                            Add frame
                        </button>
                    </div>
                </div>
                <div className="old-pictures-wrap"></div>
            </div>
            {
                image && <UpdateProfilePicture image={image} setImage={setImage}/>
            }
        </div>
    )
}
