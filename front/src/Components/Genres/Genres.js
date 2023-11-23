import React, { useState } from 'react';
import style from './Style/GenreComponent.module.css'; // Add your styling as needed

const Genres = ({}) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const genres = [
    'pop',
    'rock',
    'hip-hop',
    'electronic',
    'jazz',
    // Add more genres as needed
  ];

  const getRecommendations = async () =>{
    // try {
    //     const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     const data = await response.json();
    //     if (response.ok) {
    //       setTracks({id:artistId,tracks:data.tracks});
    //     } else {
    //       console.error('Failed to fetch top tracks');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching top tracks:', error);
    //   }
  }

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    getRecommendations(genre); // Pass the selected genre to the parent component for recommendations
  };

  return (
    <div>
      <h2>Genres</h2>
      <div className={style.genre_container}>
        {genres.map((genre, index) => (
          <div
            key={index}
            className={`${style.genre_box} ${selectedGenre === genre ? style.selected_genre : ''}`}
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
