create table streaming_links (
  id uuid default uuid_generate_v4() primary key,
  platform text not null,
  url text not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  artist_id text references artists(id) on delete cascade
);

-- Create RLS policies
alter table streaming_links enable row level security;

create policy "Public streaming links are viewable by everyone"
  on streaming_links for select
  using (is_active = true);

create policy "Only admins can insert streaming links"
  on streaming_links for insert
  with check (auth.role() = 'authenticated' and auth.jwt() ->> 'role' = 'admin');

create policy "Only admins can update streaming links"
  on streaming_links for update
  using (auth.role() = 'authenticated' and auth.jwt() ->> 'role' = 'admin');

create policy "Only admins can delete streaming links"
  on streaming_links for delete
  using (auth.role() = 'authenticated' and auth.jwt() ->> 'role' = 'admin');

-- Create function to update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_streaming_links_updated_at
  before update on streaming_links
  for each row
  execute function update_updated_at_column(); 