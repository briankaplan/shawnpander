-- Create the photos table
create table public.photos (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    url text not null,
    thumbnail_url text,
    original_filename text,
    date_taken timestamp with time zone,
    category text,
    description text,
    tags text[],
    people text[],
    location text,
    metadata jsonb default '{}'::jsonb,
    size_in_bytes integer,
    width integer,
    height integer
);

-- Enable RLS (Row Level Security)
alter table public.photos enable row level security;

-- Create policy to allow anyone to read photos
create policy "Photos are viewable by everyone" on photos
    for select using (true);

-- Create policy to allow only authenticated users to insert
create policy "Users can upload photos" on photos
    for insert with check (auth.role() = 'authenticated'); 