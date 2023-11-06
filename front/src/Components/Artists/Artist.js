import React, { useState, useEffect } from 'react';
import style from './Style/Artist.module.css';

const Artist = ({artist}) => {
  return (
    <div className={style.artist_container}>
        <img className={style.artist_image} src={artist.images[1].url} alt='#'/>
        <p>{artist.name}</p>
        <br className={style.br}></br>
    </div>
  );
};

export default Artist;
