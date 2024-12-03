import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: '6c307fdcef034e90aa22c0ad531719ad',
  clientSecret: '8ad62854ceda4a75b4fcbb6d535b68e5',
})

let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

async function refreshAccessToken() {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          '6c307fdcef034e90aa22c0ad531719ad:8ad62854ceda4a75b4fcbb6d535b68e5'
        ).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpirationTime = Date.now() + data.expires_in * 1000;
    spotifyApi.setAccessToken(accessToken);
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
}

export async function getSpotifyApi() {
  if (!accessToken || !tokenExpirationTime || Date.now() >= tokenExpirationTime) {
    await refreshAccessToken();
  }
  return spotifyApi;
}

export async function getAlbumDetails(spotifyId: string) {
  const api = await getSpotifyApi();
  try {
    const response = await api.getAlbum(spotifyId);
    return response.body;
  } catch (error) {
    console.error('Error fetching album details:', error);
    return null;
  }
}

export default spotifyApi