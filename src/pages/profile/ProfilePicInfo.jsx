import React from 'react'
import { useState, useRef } from 'react';
import ProfilePicture from '../../components/profilePicture/ProfilePicture';

export default function ProfilePicInfo({ profile, visitor }) {
  const [show, setShow] = useState(false)
  const pRef = useRef(null)
  return (
    <div className="profile-img-wrap">
    {
        show && <ProfilePicture setShow={setShow} pRef={pRef}/>
      }
            <div className="profile-w-left" ref={pRef}>
                <div className="profile-w-img">
                <div
            className="profile-w-bg"

            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
            {
              !visitor && (
                <div className="profile-circle" onClick={() => setShow(true)}>
                <i className="camera_filled_icon"></i>
              </div>
              )
        }
        </div>
        <div className="profile-w-col">
          <div className="profile-name">
            {profile.first_name} {profile.last_name}
          </div>
          <div className="profile-friend-count"></div>
          <div className="profile-friend-imgs"></div>
        </div>
      </div>
        {
          visitor ? ("") : (
            <div className="profile-w-right">
              <div className="blue_btn">
                <i className="edit_icon"></i>
                <span>Edit profile</span>
              </div>
            </div>
          )
      }
    </div>
  );
}
