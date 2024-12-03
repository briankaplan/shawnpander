<main className="flex min-h-screen flex-col bg-gradient-to-b from-black via-orange-950/5 to-black">
  {/* Fixed Header for Forever & For Now */}
  <DynamicHeader 
    title={newAlbum.title}
    description={newAlbum.description}
    releaseDate={newAlbum.releaseDate}
    streamingLinks={newAlbum.streamingLinks}
    albumImage={newAlbum.image}
  />

  <section className="relative py-20 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
    <VinylPlayer selectedAlbumId={selectedAlbum.id} />
  </section>
</main> 