import React, { useState, useEffect } from 'react';
import css from '../Style/SpotifyAuth.module.css';

const SpotifyAuthComponent = ({onclickfunc,accessToken}) => {
  return (
    <>
        <div>
          <button className={css.spotify_button} onClick={onclickfunc}>
            Authorize with Spotify
          </button>
        </div>
    </>
  );
};

export default SpotifyAuthComponent;