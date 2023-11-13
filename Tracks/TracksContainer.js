// TracksContainer.js
import React from 'react';
import Track from './Track';
import css from './Style/TracksContainer.module.css';

const TracksContainer = ({ tracks,showTracks }) => {
  console.log(showTracks);
  return (
    <div className={css.tracksContainer}>
      {showTracks &&
        tracks.map((track, index) => (
          <Track key={index} track={track} />
        ))
      }
      
    </div>
  );
};

export default TracksContainer;
