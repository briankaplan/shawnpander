-- Add experiment fields to features table
alter table public.features
add column is_experiment boolean default false,
add column variant_distribution jsonb default '{"A": 0.33, "B": 0.33, "control": 0.34}'::jsonb;

-- Create experiment results table
create table public.experiment_results (
    id uuid default uuid_generate_v4() primary key,
    feature_id uuid references public.features(id),
    user_id uuid references auth.users(id),
    variant feature_variant not null,
    converted boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create feature variant type
create type feature_variant as enum ('A', 'B', 'control');

-- Add indexes
create index experiment_results_feature_id_idx on public.experiment_results(feature_id);
create index experiment_results_user_id_idx on public.experiment_results(user_id);
create index experiment_results_variant_idx on public.experiment_results(variant);

-- Update feature events table
alter table public.feature_events
add column variant feature_variant,
add column experiment_id uuid references public.experiment_results(id); 