import { useRef, useState } from "react";
import clickOutside from "../../helpers/clickOutside";

export default function Cover({ cover }) {
  const [showCoverMneu, setShowCoverMenu] = useState(false);
  const menuRef = useRef(null);
  clickOutside(menuRef, () => setShowCoverMenu(false));
  return (
    <div className="profile-cover">
      {cover && <img src={cover} className="cover" alt="" />}
      <div className="udpate-cover-wrapper">
        <div
          className="open-cover-update"
          onClick={() => setShowCoverMenu((prev) => !prev)}
        >
          <i className="camera_filled_icon"></i>
          Add Cover Photo
        </div>
        {showCoverMneu && (
          <div className="open-cover-menu" ref={menuRef}>
            <div className="open-cover-menu-item hover1">
              <i className="photo_icon"></i>
              Select Photo
            </div>
            <div className="open-cover-menu-item hover1">
              <i className="upload_icon"></i>
              Upload Photo
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
