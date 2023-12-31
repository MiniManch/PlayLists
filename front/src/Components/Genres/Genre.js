import React, { useState } from 'react';
import style from './Style/Genre.module.css';
import FloatingTitle from './FloatingTitle';

const Genre = ({ data }) => {

  return (
    <div
      key={data.index}
      className={style.genre_box }
      onClick={() => data.handleGenreClick(data.genre)}
    >
      <img className={style.genreImage} src={data.genre.icons[0].url} alt={data.genre.name} />
      <div className={style.floatingTitle}>
        <FloatingTitle title={data.genre.name} />
      </div>
    </div>
  );
};

export default Genre;
