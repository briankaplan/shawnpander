import SpotifyWebApi from 'spotify-web-api-node';

const ARTIST_ID = '5msMT1CsExJLdv96xtMwXE';

const spotifyApi = new SpotifyWebApi({
  clientId: '6c307fdcef034e90aa22c0ad531719ad',
  clientSecret: '8ad62854ceda4a75b4fcbb6d535b68e5'
});

export interface Album {
  id: string;
  title: string;
  releaseDate: string;
  artwork: string;
  spotifyUrl: string;
  tracks: Track[];
}

export interface Track {
  id: string;
  title: string;
  duration: number;
  previewUrl?: string;
  spotifyUri: string;
}

// Initialize access token
let tokenInitialized = false;
async function initializeToken() {
  if (tokenInitialized) return;
  
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body.access_token);
    tokenInitialized = true;
  } catch (error) {
    console.error('Error initializing Spotify token:', error);
  }
}

export async function getArtistAlbums() {
  await initializeToken();

  try {
    const data = await spotifyApi.getArtistAlbums(ARTIST_ID, { 
      limit: 50,
      include_groups: 'album,single'
    });
    
    return data.body.items.map(album => ({
      id: album.id,
      title: album.name,
      releaseDate: album.release_date,
      artwork: album.images[0]?.url || '',
      spotifyUrl: album.external_urls.spotify,
      tracks: []
    }));
  } catch (error) {
    console.error('Error fetching albums:', error);
    return [];
  }
}

export async function getLatestRelease() {
  await initializeToken();

  try {
    const data = await spotifyApi.getArtistAlbums(ARTIST_ID, {
      limit: 1,
      include_groups: 'single,album'
    });
    
    if (data.body.items.length === 0) return null;

    const latest = data.body.items[0];
    return {
      id: latest.id,
      title: latest.name,
      releaseDate: latest.release_date,
      artwork: latest.images[0]?.url || '',
      spotifyUrl: latest.external_urls.spotify
    };
  } catch (error) {
    console.error('Error fetching latest release:', error);
    return null;
  }
}

export default spotifyApi; 