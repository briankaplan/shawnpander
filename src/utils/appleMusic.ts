import jwt from 'jsonwebtoken';

// Generate Apple Music API token
function generateToken() {
  const privateKey = process.env.APPLE_MUSIC_PRIVATE_KEY!.replace(/\\n/g, '\n');
  const token = jwt.sign({}, privateKey, {
    algorithm: 'ES256',
    expiresIn: '180d',
    issuer: process.env.APPLE_MUSIC_TEAM_ID,
    header: {
      alg: 'ES256',
      kid: process.env.APPLE_MUSIC_KEY_ID
    }
  });
  
  return token;
}

export async function getArtistData() {
  try {
    const token = generateToken();
    const response = await fetch(
      `https://api.music.apple.com/v1/catalog/us/artists/${process.env.APPLE_MUSIC_ARTIST_ID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch Apple Music data');
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Apple Music data:', error);
    return null;
  }
}

export async function getArtistTopTracks() {
  try {
    const token = generateToken();
    const response = await fetch(
      `https://api.music.apple.com/v1/catalog/us/artists/${process.env.APPLE_MUSIC_ARTIST_ID}/songs?limit=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch Apple Music tracks');
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Apple Music tracks:', error);
    return [];
  }
} 