import React, { useState, useEffect } from 'react';
import Artist from './Artist';
import style from './Style/TopArtists.module.css';

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState([]);
  const [displayedArtists, setDisplayedArtists] = useState(5);
  const [showMoreClicked, setShowMoreClicked] = useState(false);
  const [showMoreText, setShowMoreText] = useState('Show More');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchTopArtists(token);
    }
  }, []);

  const fetchTopArtists = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTopArtists(data.items);
      } else {
        console.error('Failed to fetch top artists');
      }
    } catch (error) {
      console.error('Error fetching top artists:', error);
    }
  };

  const handleShowMore = () => {
    if (!showMoreClicked) {
      setDisplayedArtists(10);
      setShowMoreClicked(true);
      setShowMoreText('Show Less');
    } else {
      setDisplayedArtists(5);
      setShowMoreClicked(false);
      setShowMoreText('Show More');
    }
  };

  return (
    <div>
      <h2>Top Artists</h2>
      <div className={style.artists_container}>
        {topArtists.slice(0, displayedArtists).map((artist, index) => (
          <Artist key={index} artist={artist} />
        ))}
      </div>
      <button onClick={handleShowMore}>{showMoreText}</button>
    </div>
  );
};

export default TopArtists;
