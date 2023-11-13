// TopTracks.js
import React, { useState } from 'react';
import style from './Style/ArtistTopTracks.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import TracksContainer from './TracksContainer';

const TopTracks = ({ artist, func, visibleArtists, setVisibleArtists }) => {
  const [tracks, setTracks] = useState([]);

  const resetTracks = () => {
    setTracks([]);
    setVisibleArtists((prev) => prev.filter((prevArtist) => prevArtist !== artist.id));
  };

  const changeTracks = () => {
    func(artist.id, setTracks);
    setVisibleArtists((prev) => [...prev, artist.id]);
  };

  return (
    <ul>
      {visibleArtists.includes(artist.id) ? (
        <>
          <FontAwesomeIcon icon={faAngleLeft} className={style.icon} onClick={resetTracks} />
          <TracksContainer showTracks={true} tracks={tracks.slice(0, 5)} />
        </>
      ) : (
        <FontAwesomeIcon icon={faAngleRight} className={style.icon} onClick={changeTracks} />
      )}
    </ul>
  );
};

export default TopTracks;
