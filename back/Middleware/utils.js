const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const handleCodeExchange = async (req) => {
    // Use req.headers.origin if available, otherwise use req.headers.referer
    const redirectUri = req.headers.origin || req.headers.referer || 'http://default-homepage.com';

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                redirect_uri: redirectUri,
                client_id: clientId,
                client_secret: clientSecret,
            }),
        });

        const data = await response.json();
        const accessToken = data.access_token;

        // Use the accessToken to make requests to the Spotify API
        const userResponse = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userData = await userResponse.json();
        console.log('User Data:', userData);

        // Set the token in state or perform other actions with userData
        return accessToken;
    } catch (error) {
        console.error('Error exchanging code for token:', error);
    }
};
