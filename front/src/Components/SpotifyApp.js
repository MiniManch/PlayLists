import React, { useState, useEffect } from 'react';
import css from '../Style/SpotifyApp.module.css';
import SpotifyAuth from './SpotifyAuth';
import SpotifyProfile from './SpotifyProfile';
import TopArtists from './Artists/TopArtists';
import GenreContainer from './Genres/GenreContainer';

const SpotifyApp = () => {
  const [userAuthCode, setUserAuthCode] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      setUserAuthCode(code);
      localStorage.setItem('user_auth_code', code);
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

  // Check for userAuthCode and initiate the request to obtain the access token
  useEffect(() => {
    if (userAuthCode) {
      const fetchAccessToken = async () => {
        try {
          const encodedCode = encodeURIComponent(userAuthCode);
          console.log(encodedCode);
          const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/spotify-callback?code=${encodedCode}`);
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
            <SpotifyAuth onclickfunc={handleSpotifyAuth} accessToken={accessToken}/>
        </div>
        :
        <div>
          <SpotifyProfile/>
          <TopArtists />
          <GenreContainer/>
        </div>
      }
    </>
  );
};

export default SpotifyApp;