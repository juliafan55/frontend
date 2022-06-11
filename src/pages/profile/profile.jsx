import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { profileReducer } from '../../helpers/reducers';
import { useReducer, useState } from 'react';
import axios from 'axios';
import Header from '../../components/header/Header';
import "./profile.css"
import ProfilePicInfo from './ProfilePicInfo';
import Cover from './Cover';
import CreatePost from '../../components/createPost/CreatePost';
import Post from "../../components/post/Post"
import Friends from './Friends';

export default function Profile({setVisible}) {
    const { username } = useParams();
    const {user} = useSelector((state) => ({...state}))
    let userName = username === undefined ? user.username : username
    let visitor = userName === user.username ? false : true

    const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, { loading: false, profile: [], error: "" })
    const navigate = useNavigate()
    
    useEffect(() => {
        getProfile()
    }, [username]);

    const getProfile = async () => {
        try {
          dispatch({
            type: "PROFILE_REQUEST",
          });
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
            if (data.ok === false) {
                navigate('/profile');
            } else {
                dispatch({
                  type: "PROFILE_SUCCESS",
                  payload: data,
                });
            }
        } catch (error) {
          dispatch({
            type: "PROFILE_ERROR",
            payload: error.response.data.message,
          });
        }
    };
  
  console.log(profile)
    
    return (
        <div className="profile">
            <Header />
            <div className="profile-top">
                <div className="profile-container">
                    <Cover cover={profile.cover} visitor={visitor}/>
                    <ProfilePicInfo profile={profile} visitor={visitor}/>
                    <div className="profile-grid">
                        <div className="profile-left">
                            <Friends friends={profile.friends}/>
                        </div>
                        <div className="profile-right">
                            {
                                !visitor && <CreatePost user={user} profile setVisible={setVisible} />
                            }
                            <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => (
                      <Post post={post} user={user} key={post._id} />
                    ))
                  ) : (
                    <div className="no-posts">No posts available</div>
                  )}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    )
}
