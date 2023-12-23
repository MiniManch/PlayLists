import React, { useState, useEffect } from 'react';
import Genre from './Genre';
import style from './Style/GenreContainer.module.css';

const Genres = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);
  const [openGenres, setOpenGenres] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMoreCategories, setHasMoreCategories] = useState(false);

  // Function to get Spotify categories with pagination
  const getCategoriesWithPagination = async () => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.error('Access token not found in localStorage');
      return;
    }

    const apiUrl = 'https://api.spotify.com/v1/browse/categories';
    const limit = 15; // Display up to 15 categories at a time

    try {
      const response = await fetch(`${apiUrl}?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newCategories = data.categories.items;
        setGenres((prevGenres) => [...prevGenres, ...newCategories]);

        // Check if there are more categories to fetch
        setHasMoreCategories(data.categories.next !== null);
      } else {
        console.error('Failed to fetch categories:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    if (openGenres) {
      getCategoriesWithPagination();
    }
  }, [offset, openGenres]); // Trigger the effect when offset or openGenres changes

  const getGenres = () => {
    if(openGenres) {
      setHasMoreCategories(false);
    }
    
    setOpenGenres(!openGenres);
    // Reset offset when reopening genres to start from the beginning
    setOffset(0);
    // Clear existing genres when reopening genres
    setGenres([]);

  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const loadMoreCategories = () => {
    setOffset((prevOffset) => prevOffset + 15);
  };

  return (
    <>
      <div className={openGenres ? style.genresContainer : style.hiddenGenresContainer}>
        {openGenres && (
          <button className={style.closeButton} onClick={getGenres}>
            Close
          </button>
        )}
        {!openGenres ? (
          <button onClick={getGenres}>Genres</button>
        ) : (
          <div className={style.genreContainer}>
            {genres.map((genre, index) => (
              <Genre
                key={`${genre.id}_${index}`}
                data={{
                  genre: genre,
                  handleGenreClick: handleGenreClick,
                  index: index,
                  selectedGenre: selectedGenre,
                }}
              />
            ))}
          </div>
        )}
        {hasMoreCategories && (
          <button className={style.loadMore} onClick={loadMoreCategories}>
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default Genres;
