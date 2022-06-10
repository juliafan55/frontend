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

export default function Profile() {
    const { username } = useParams();
    const {user} = useSelector((state) => ({...state}))
    let userName = username === undefined ? user.username : username
    const [visible, setVisible] = useState(false)
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
    
    
    return (
        <div className="profile">
            <Header />
            <div className="profile-top">
                <div className="profile-container">
                    <Cover cover={profile.cover} />
                    <ProfilePicInfo profile={profile}/>

                    </div>
                </div>
            </div>
    )
}
