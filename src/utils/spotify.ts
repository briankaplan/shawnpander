import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export async function getArtistTopTracks() {
  try {
    // Get an access token
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);

    // Get artist's top tracks
    const response = await spotifyApi.getArtistTopTracks(
      process.env.NEXT_PUBLIC_SPOTIFY_ARTIST_ID!,
      'US'
    );
    
    return response.body.tracks;
  } catch (error) {
    console.error('Error fetching Spotify tracks:', error);
    return [];
  }
}

export async function getArtistAlbums() {
  try {
    // Get an access token if not already set
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);

    const response = await spotifyApi.getArtistAlbums(
      process.env.NEXT_PUBLIC_SPOTIFY_ARTIST_ID!,
      { limit: 50 }
    );
    
    return response.body.items;
  } catch (error) {
    console.error('Error fetching Spotify albums:', error);
    return [];
  }
} 