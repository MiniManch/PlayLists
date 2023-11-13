// Artist.js
import React, { useState } from 'react';
import ArtistTopTracks from '../Tracks/ArtistTopTracks';
import style from './Style/Artist.module.css';

const Artist = ({ artist }) => {
  const token = localStorage.getItem('access_token');
  const [visibleArtists, setVisibleArtists] = useState([]);

  const getTopTracks = async (artistId, stateVar) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        stateVar(data.tracks);
      } else {
        console.error('Failed to fetch top artists');
      }
    } catch (error) {
      console.error('Error fetching top artists:', error);
    }
  };

  return (
    <div className={style.artist_container}>
      <img className={style.artist_image} src={artist.images[1].url} alt='#' />
      <p>{artist.name}</p>
      <ArtistTopTracks
        artist={artist}
        func={getTopTracks}
        visibleArtists={visibleArtists}
        setVisibleArtists={setVisibleArtists}
      />
    </div>
  );
};

export default Artist;
