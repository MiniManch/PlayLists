import React, { useState, useEffect } from 'react';
import css from '../Style/SpotifyAuth.module.css';

import SpotifyProfile from './SpotifyProfile';

const SpotifyAuthComponent = () => {
  const [userAuthCode, setUserAuthCode] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
  
    const codeFromStorage = localStorage.getItem('user_auth_code');
    if (code || codeFromStorage) {
      setUserAuthCode(code || codeFromStorage);
      localStorage.setItem('user_auth_code', code || codeFromStorage);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSpotifyAuth = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/get-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.authURL; // Redirect the user to Spotify authorization page
      } else {
        console.error('Failed to get Spotify authorization URL');
      }
    } catch (error) {
      console.error('Error during Spotify authentication:', error);
    }
  };

  useEffect(() => {
    if (userAuthCode) {
      const fetchAccessToken = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/spotify-callback?code=${userAuthCode}`);
          const data = await response.json();
          if (response.ok) {
            setAccessToken(data.token); // Set the accessToken state
            localStorage.setItem('access_token', data.token); // Save accessToken to localStorage
          } else {
            console.error('Failed to get access token from Spotify');
          }
        } catch (error) {
          console.error('Error during access token request:', error);
        }
      };

      fetchAccessToken();
    }
  }, [userAuthCode]);

  return (
    <>
      {!accessToken ? 
        <div>
          <button className={css.spotify_button} onClick={handleSpotifyAuth}>
            Authorize with Spotify
          </button>
        </div>
        :
        <SpotifyProfile />
      }
      
    </>
  );
};

export default SpotifyAuthComponent;
