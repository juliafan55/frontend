import React from 'react'
import { useCallback, useState, useRef } from 'react'
import Cropper from "react-easy-crop"

export default function UpdateProfilePicture({ setImage, image }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const slider = useRef(null)
  
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      console.log(croppedArea, croppedAreaPixels)
    }, [])

    const zoomIn = () => {
        slider.current.stepUp()
        setZoom(slider.current.value)
    }

    const zoomOut = () => {
        slider.current.stepDown()
        setZoom(slider.current.value)
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
            </div>
    )
}
