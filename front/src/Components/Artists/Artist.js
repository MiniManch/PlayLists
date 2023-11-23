// Artist.js
import React, { useState } from 'react';
import ArtistTopTracks from '../Tracks/ArtistTopTracks';
import style from './Style/Artist.module.css';

const Artist = ({ artist, changeTracks, resetTracks, tracks}) => {
  const token = localStorage.getItem('access_token');

  return (
    <div className={style.artist_container}>
      <img className={style.artist_image} src={artist.images[1].url} alt='#' />
      <p>{artist.name}</p>
      <ArtistTopTracks
        artist={artist}
        change={changeTracks}
        reset={resetTracks}
        tracks={tracks}
      />
    </div>
  );
};

export default Artist;
