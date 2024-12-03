create table public.features (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique,
    description text,
    enabled boolean not null default false,
    environment text not null default 'all' check (environment in ('development', 'production', 'all')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default features
insert into public.features (name, description, enabled, environment) values
    ('MUSIC_PLAYER', 'Enable the vinyl player and music features', true, 'all'),
    ('SPOTIFY_INTEGRATION', 'Enable Spotify integration and playback', true, 'all');

-- Set up RLS policies
alter table public.features enable row level security;

create policy "Allow public read access"
    on public.features for select
    using (true);

create policy "Allow authenticated update"
    on public.features for update
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- Create updated_at trigger
create trigger set_features_updated_at
    before update on public.features
    for each row
    execute function public.set_updated_at(); 