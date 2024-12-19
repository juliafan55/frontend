import React from 'react'
import { useCallback, useState, useRef } from 'react'
import Cropper from "react-easy-crop"
import getCroppedImg from '../../helpers/getCroppedImg'
import { useSelector } from 'react-redux'
import { uploadImages } from '../../helpers/uploadImages'
import { updateprofilePicture } from '../../helpers/user'
import { createPost } from '../../helpers/createPost'
import {PulseLoader} from "react-spinners"

export default function UpdateProfilePicture({ setImage, image, setError, setShow, pRef }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [loading, setLoading] = useState(false)
    const slider = useRef(null)
    const { user } = useSelector((state) => ({ ...state }));
  
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const zoomIn = () => {
        slider.current.stepUp()
        setZoom(slider.current.value)
    }

    const zoomOut = () => {
        slider.current.stepDown()
        setZoom(slider.current.value)
    }

    const getCroppedImage = useCallback(async (show) => {
        try {
            const img = await getCroppedImg(image, croppedAreaPixels)
            if (show) {
                setZoom(1)
                setCrop({x:0, y:0})
                setImage(img)
                
            } else {

                return img;
            }
        } catch (error) {
            console.log(error)
        }
    }, [croppedAreaPixels])

    const refresh = () => {
        window.location.reload(false)
    }
    
    const updateProfilePicture = async () => {
        try {
            setLoading(true);
            let img = await getCroppedImage();
            let blob = await fetch(img).then((b) => b.blob());
            const path = `${user.username}/profile_pictures`;
            let formData = new FormData();
            formData.append("file", blob);
            formData.append("path", path);
            const res = await uploadImages(formData, path, user.token);
            const updated_picture = await updateprofilePicture(
                res[0].url,
                user.token
            );
            setLoading(false)
            console.log("UPDATED", updated_picture)
            // refresh()
            if (updated_picture === 'ok') {
                console.log("NEXT UPDATED", updated_picture)
                setLoading(false)
                setImage("")
                pRef.current.style.backgroundImage = `url(${res[0].url})`
            } else {
                setLoading(false)
                setError(updated_picture)
            }
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    }

    return (
        <div className="post-box update-img">
        <div className="box-header">
            <div className="small-circle" onClick={()=>setImage("")}>
                <i className="exit_icon"></i>
            </div>
            <span>Update profile picture</span>
            </div>
            <div className="update-center">
                <div className="cropper">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 1}
                    cropShape="round"
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
                </div>
                <div className="slider">
                    <div className="slider-circle" onClick={() => zoomOut()}>
                        <i className="minus_icon"></i>
                    </div>
                    <input type="range" min={1} max={3} step={0.2} ref={slider} value={zoom} onChange={(e) => setZoom(e.target.value)}  />
                    <div className="slider-circle" onClick={() => zoomIn()}>
                        <i className="plus_icon"></i>
                    </div>
                </div>
            </div>
                <div className="flex-up">
                    <div className="pink-btn"><i className="crop_icon"></i>Crop</div>
                </div>
                <div className="update-submit-wrap" onClick={() => setShow(false)}>
                    <div className="link">Cancel</div>
                <button className="pink-btn" disabled={loading} onClick={() => updateProfilePicture()}>
                {loading ? <PulseLoader size={5} /> : "Save"}
                    </button>
                </div>
            </div>
    )
}
