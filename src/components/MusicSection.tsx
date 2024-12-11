import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Track {
  id: string;
  name: string;
  albumName?: string;
  imageUrl?: string;
  previewUrl?: string;
  externalUrl: string;
  service: 'spotify' | 'apple';
}

export default function MusicSection() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await fetch('/api/music/tracks');
        if (!response.ok) throw new Error('Failed to fetch music data');
        
        const data = await response.json();
        
        // Normalize Spotify tracks
        const spotifyTracks = data.spotify.map((track: any) => ({
          id: track.id,
          name: track.name,
          albumName: track.album.name,
          imageUrl: track.album.images[0]?.url,
          previewUrl: track.preview_url,
          externalUrl: track.external_urls.spotify,
          service: 'spotify' as const
        }));

        // Normalize Apple Music tracks
        const appleTracks = data.appleMusic.map((track: any) => ({
          id: track.id,
          name: track.attributes.name,
          albumName: track.attributes.albumName,
          imageUrl: track.attributes.artwork?.url?.replace('{w}x{h}', '300x300'),
          previewUrl: track.attributes.previews?.[0]?.url,
          externalUrl: track.attributes.url,
          service: 'apple' as const
        }));

        setTracks([...spotifyTracks, ...appleTracks]);
      } catch (err) {
        setError('Failed to load music tracks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusicData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading music...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section className="py-12 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Latest Music</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track) => (
            <div 
              key={`${track.service}-${track.id}`}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {track.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={track.imageUrl}
                    alt={track.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{track.name}</h3>
                {track.albumName && (
                  <p className="text-gray-400 mb-3">{track.albumName}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <a
                    href={track.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-full transition-colors"
                  >
                    Listen on {track.service === 'spotify' ? 'Spotify' : 'Apple Music'}
                  </a>
                  
                  {track.previewUrl && (
                    <audio controls className="w-32">
                      <source src={track.previewUrl} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 