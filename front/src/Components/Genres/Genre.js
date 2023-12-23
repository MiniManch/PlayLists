import React, { useState, useEffect } from 'react';
import style from './Style/Genre.module.css';

const Genre = ({data}) =>{
    return(
        <div
            key={data.index}
            className={`${style.genre_box} ${data.selectedGenre === data.genre ? style.selected_genre : ''}`}
            onClick={() => data.handleGenreClick(data.genre)}
          >
            <img className={style.genreImage} src={data.genre.icons[0].url} alt={data.genre.name} />
        </div>
    )
}

export default Genre;