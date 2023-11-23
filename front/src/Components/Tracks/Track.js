import React, { useState, useEffect } from 'react';
import css from './Style/Track.module.css';

const Track = ({track}) => {
  return (
    <>
        <div className={css.track}>
            {track.name}
        </div>
    </>
  );
};

export default Track;