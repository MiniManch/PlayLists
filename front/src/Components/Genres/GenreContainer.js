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
          <button className={style.genreButton} onClick={getGenres}>
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEnElEQVR4nO2aX2hbZRjGn5g2nWZTmy3pttS52j+OqcgYKbWpbZPRWu0fU0u86k2Vzgu3YW82V3ph7XBeeOOVN4LzSpAKG44J2jHWi2yCYxMEhQmriXNeeLE2gzGqvPLGfPCRnpxz0nO+43dxfvBAHs77Pe+Tc5JcBfDx8fHx8fHxsclhQn12Haey6yhk/wZpIe6yjgXuBtVM3MepifsgTbWg/AZkVvH7+Bro1SL6oQmvFZHiTplVFJQvy/wFYkEzlPXKEoJjf2Bu7A5Wxu6AhKAZcjfuOvonZrm74+CRPOZG8qBKQTOMOg7/hlnHwS/fxMorv4KifaU3TfyaBc2QelG0v9zzJm45Dh76GcTiYJbktUJZz5d+BLFEsOS1QlnPgR9ALBEsea1Q1vPQFRBLBEteCekcRtM5XErncE/sEkpfwe1DOXyY/Qkhz3qmLoNYIljyrtO/jA9SyyAr9S/jtGc9+5ZALBEsecM5u6o837uE0fK1B71LON79LXZv2PEdesoztzfbs2Z6vwGxRLDkDefsqvL8ixdwqXTtAk5U65L+GvHy+bXN9qyZnnMglgiWvKskz6HIud1nNz55aeYkzyTP4qJnPbsXQSwRLHlXMcvt+hLx5CJOdi/iAc+88BWGPevZ9QWIJYIlbzhnVyZ7rPIWnPSsmc7PQSwRLHnDObsy2bMhL3EGxcQZXOz8bOOTr7VnzSQ+BbFEsORdxWmusp4HPwGxRLDkXcVprrKeBz4GsUSw5A3n7Mpkj9KeNfP8RyCWCJa84ZxdmexR2rNmnjsNYolgybuK01xlPZ+dB7FEsORdxWmusp7750AsESx5V3Gaq6znvuMglgiWvKvsOwFiadezYwbEEsGSt0XbUTS0z+BYxwyutr+De+J8ZU6tuW73rErbERBLBEvekva3EG99GzfEGSMZ7PG8pymth0EsESx5yyffOo0bPPvUNPIt05h4+g1ss7HH056WtEyBWCJY8qbsncIxnts7hXzzm4jUsMfTnpY8OQliiWDJm7JnEt/z3J5JTNS4x9OeljzxOoglgiVvda7Ic9vHqn/sBTzDs81ZrHrd05L4OIglgiVvfi6DIs/ZuQHxcaRLuRlc87qnJbtGQCwRLHmrc1d38+wwxm3Mni/Pvud1T0t2DoJYIljypjQN4ijPNQ3gl+bB6j+COwcwV868u6sPO7zuaUksBWKJYMmb0jaEhlgK18vzhWga2cgQHuVr0T5sbUohHUvhfOl6P/6J9SHzf/S0ZEcPiCWCJW9JpAvx7T24Ls4YKom7kaT110RlT1MinSCWCJa8PfYjFOnEkUgnco0JFPlsYwJrjQlca0xgfuvBzX/sXe1ZjccPgFgiWPJaoaznY8+AWCJY8lqhrOe2DhBLBEteK5T1DLdgJdwCCj7yXzC/ZkEzpF6lrmXv/C8yW+KYfTgOqhQ0w6jjljjedSM7GIphNhTFrYYYSAiaIXfjrqFo6c07/5tcJaFGEAua4VmvujAKdWFQMIwUNCEYRpo71YWRV74sUI+Fh0IgHRWox7zyGwCgHgEsIIACAiBNxF3eL3Xz8fHx8fHx8YE9/gX4uFPOvExQMwAAAABJRU5ErkJggg=='/>
          </button>
        ) : (
          <div className={style.genreContainerContainer}>
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
            {hasMoreCategories && (
              <button className={style.loadMore} onClick={loadMoreCategories}>
                Load More
              </button>
            )} 
          </div>
        )}
      </div>
    </>
  );
};

export default Genres;
