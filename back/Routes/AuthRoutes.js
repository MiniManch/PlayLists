const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTFY_CLIENT_SECRET;

router.post('/get-access', async (req, res) => {
  // Use req.headers.origin if available, otherwise use req.headers.referer
  const redirectUri = req.headers.origin || req.headers.referer || 'http://default-homepage.com';
  const scopes = encodeURIComponent('user-read-private user-read-email user-top-read');
  const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
  res.status(200).json({ authURL });
});

router.get('/spotify-callback', async (req, res) => {
  const authorizationCode = req.query.code; // Received authorization code from Spotify
  // Use req.headers.origin if available, otherwise use req.headers.referer
  const redirectUri = req.headers.origin || req.headers.referer || 'http://default-homepage.com';
  const data = {
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      const accessToken = responseData.access_token;

      res.status(200).json({ token: accessToken });
    } else {
      res.status(response.status).json({ error: 'Failed to obtain access token' });
    }
  } catch (error) {
    console.error('Error during access token request:', error);
    res.status(500).json({ error: 'Failed to obtain access token from Spotify' });
  }
});

module.exports = router;
