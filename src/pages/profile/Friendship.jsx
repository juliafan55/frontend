import React, { useRef, useEffect } from 'react'
import { useState } from 'react'
import useClickOutside from '../../helpers/clickOutside'
import { useSelector } from "react-redux"
import {addFriend, cancelRequest, follow, unfollow} from "../../helpers/user"

export default function Friendship( {friendshipp, profileid}) {
    const [friendsMenu, setFriendsMenu] = useState(false)
    const [respondMenu, setRespondMenu] = useState(false)
    const [friendship, setFriendship] = useState(friendshipp)
    const menu = useRef(null)
    const respond = useRef(null)
    useClickOutside(menu, () => setFriendsMenu(false))
    useClickOutside(respond, () => setRespondMenu(false))

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        setFriendship(friendshipp)
    },[friendshipp])
    
    const addFriendHandler = async () => {
        setFriendship({ ...friendship, requestSent: true, following: true });
        await addFriend(profileid, user.token);
    }

    const cancelRequestHandler = async () => {
        setFriendship({ ...friendship, requestSent: false, following: false });
        await cancelRequest(profileid, user.token);
    }

    const followHandler = async () => {
        setFriendship({ ...friendship, following: true });
        await follow(profileid, user.token);
    }

    const unfollowHandler = async () => {
        setFriendship({ ...friendship, following: false });
        await unfollow(profileid, user.token);
    }


    return (
        <div className="friendship">
        {
        friendship?.friends ? (
            <div className="friends-menu-wrap">
                <button className="pink-btn" onClick={() => setFriendsMenu(true)}>
                    <img src="../../../icons/friends.png" alt="" />
                    <span>Friends</span>
                </button>
                {
                    friendsMenu && (
                    <div className="open-cover-menu" ref={menu}>
                        <div className="open-cover-menu-item">
                        <img src="../../../icons/favoritesOutline.png" alt="" />Favorites</div>
                {
                    friendship?.following ? (
                        <div className="open-cover-menu-item hover-blue" onClick={() =>unfollowHandler()}>
                        <img src="../../../icons/unfollowOutlined.png" alt="" />Unfollow</div>
                    ) : (
                        <div className="open-cover-menu-item hover-blue" onClick={() =>followHandler()}>
                        <img src="../../../icons/unfollowOutlined.png" alt="" />Follow</div>
                    )
                }
                        <div className="open-cover-menu-item hover-blue">
                        <i className="unfriend_outlined_icon"></i>Unfriend</div>
                    </div>
                )}
            </div>
                ) : !friendship?.requestSent &&
                    !friendship?.requestReceived && (
                        <button className="pink-btn" onClick={() => addFriendHandler()}
                        >
                            <img src="../../../icons/addFriend.png" alt="" />
                            <span>Add Friend</span>
                        </button>
                )}

            {/* { friendship?.requestSent ? (
                    <button className="pink-btn" onClick={()=>cancelRequestHandler()}>
                        <img src="../../../icons/cancelRequest.png" alt="" />
                        <span>Cancel Request</span>
                   </button>
                   ) : (
                        friendship?.requestReceived && (
                            <div className="friends-menu-wrap">
                            <button className="pink-btn" onClick={() => setRespondMenu(true)}>
                                <img src="../../../icons/friends.png" alt="" />
                                <span>Respond</span>
                            </button>
                            {
                                respondMenu && (<div className="open-cover-menu" ref={respond}>
                                    <div className="open-cover-menu-item hover-blue">Confirm</div>
                                    <div className="open-cover-menu-item hover-blue">Delete</div>
                                </div>
                                )}
                            </div>
                        )
                    )}
            {
                friendship?.following ? (
                <button className="pink-btn">
                    <img src="../../../icons/follow.png" alt="" />
                    <span>Following</span>
                    </button>
                ) : (
                    <button className="pink-btn">
                    <img src="../../../icons/follow.png" alt="" />
                    <span>Follow</span>
                    </button>
                )
            }
            <button className="pink-btn">
                <img src="../../../icons/message.png" alt="" />
                <span>Message</span>
             </button>
        </div>
    )
} */}
            
            {friendship?.requestSent ? (
        <button className="pink-btn" onClick={() => cancelRequestHandler()}>
          <img
            src="../../../icons/cancelRequest.png"
            className="invert"
            alt=""
          />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className="friends-menu-wrap">
            <button className="pink-btn" onClick={() => setRespondMenu(true)}>
              <img src="../../../icons/friends.png" alt="" />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className="open-cover-menu" ref={respond}>
                <div className="open-cover-menu-item">Confirm</div>
                <div className="open-cover-menu-item">Delete</div>
              </div>
            )}
          </div>
        )
      )}
      {friendship?.following ? (
        <button className="pink-btn" onClick={() => unfollowHandler()}>
          <img src="../../../icons/follow.png" alt="" />
          <span>Following</span>
        </button>
      ) : (
        <button className="pink-btn" onClick={() => followHandler()}>
          <img src="../../../icons/follow.png" className="invert" alt="" />
          <span>Follow</span>
        </button>
      )}
      <button className={friendship?.friends ? "pink-btn" : "pink-btn"}>
        <img
          src="../../../icons/message.png"
          className={friendship?.friends && "invert"}
          alt=""
        />
        <span>Message</span>
      </button>
    </div>
  );
}

