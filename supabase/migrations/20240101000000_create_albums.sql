-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Create albums table
create table public.albums (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    release_date date not null,
    artwork text,
    spotify_id text unique,
    apple_music_id text unique,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create tracks table
create table public.tracks (
    id uuid primary key default uuid_generate_v4(),
    album_id uuid references public.albums(id) on delete cascade,
    title text not null,
    duration integer not null,
    spotify_id text unique,
    apple_music_id text unique,
    preview_url text,
    position integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create plays table for tracking
create table public.plays (
    id uuid primary key default uuid_generate_v4(),
    track_id uuid references public.tracks(id) on delete cascade,
    platform text not null check (platform in ('spotify', 'apple')),
    played_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create stats table for caching
create table public.stats (
    id uuid primary key default uuid_generate_v4(),
    track_id uuid references public.tracks(id) on delete cascade,
    total_plays integer default 0,
    spotify_plays integer default 0,
    apple_plays integer default 0,
    last_updated timestamp with time zone default timezone('utc'::text, now())
);

-- Add indexes
create index idx_albums_spotify_id on public.albums(spotify_id);
create index idx_albums_apple_music_id on public.albums(apple_music_id);
create index idx_tracks_spotify_id on public.tracks(spotify_id);
create index idx_tracks_apple_music_id on public.tracks(apple_music_id);
create index idx_plays_track_id on public.plays(track_id);
create index idx_plays_played_at on public.plays(played_at);

-- Add triggers for updating timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

create trigger update_albums_updated_at
    before update on public.albums
    for each row
    execute procedure update_updated_at_column();

create trigger update_tracks_updated_at
    before update on public.tracks
    for each row
    execute procedure update_updated_at_column(); 