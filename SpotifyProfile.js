// SpotifyProfile.js
import React, { useState, useEffect } from 'react';
import css from '../Style/SpotifyProfile.module.css';

const SpotifyProfile = () => {
    const [userData, setUserData] = useState(null);

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('access_token');
        if (token){
            try {
                const response = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUserData(userData);
                } else {
                    console.error('Failed to fetch user profile');
                    localStorage.removeItem('user_auth_code');
                    localStorage.removeItem('access_token');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <>
            { 
                userData ?
                    <div className={css.profile_container}>
                        <img className={css.profile_image} src={userData.images[0].url} alt="Profile" />
                        <p className={css.profile_name}>{userData.display_name}</p>
                    </div>
                    :
                null
            }
        </>
    );
};

export default SpotifyProfile;