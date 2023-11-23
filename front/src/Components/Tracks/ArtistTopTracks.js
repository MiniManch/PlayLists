// TopTracks.js
import React, { useState } from 'react';
import style from './Style/ArtistTopTracks.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import TracksContainer from './TracksContainer';

const TopTracks = ({ artist, change, reset, tracks}) => {
  return (
    <ul>
      {tracks.id == artist.id ? (
        <>
          <FontAwesomeIcon icon={faAngleLeft} className={style.icon} onClick={reset} />
          <TracksContainer showTracks={true} tracks={tracks.tracks.slice(0, 5)} />
        </>
      ) : (
        <FontAwesomeIcon icon={faAngleRight} className={style.icon} onClick={()=>(change(artist.id))} />
      )}
    </ul>
  );
};


export default TopTracks;
