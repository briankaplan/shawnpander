create table public.feature_events (
    id uuid default uuid_generate_v4() primary key,
    feature_id uuid references public.features(id),
    feature_name text not null,
    enabled boolean not null,
    environment text not null,
    user_id uuid references auth.users(id),
    session_id text not null,
    timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS policies
alter table public.feature_events enable row level security;

create policy "Allow insert for all users"
    on public.feature_events for insert
    with check (true);

create policy "Allow read for authenticated users"
    on public.feature_events for select
    using (auth.role() = 'authenticated');

-- Create indexes for analytics queries
create index feature_events_feature_id_idx on public.feature_events(feature_id);
create index feature_events_timestamp_idx on public.feature_events(timestamp);
create index feature_events_user_id_idx on public.feature_events(user_id); 