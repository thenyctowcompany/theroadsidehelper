-- Booking form v2: address autocomplete, scheduled pickup, media uploads.

alter table public.leads
  add column if not exists address text,
  add column if not exists pickup_at timestamptz,
  add column if not exists media_urls text[] not null default '{}';

create index if not exists leads_pickup_at_idx on public.leads (pickup_at);

-- Storage bucket for lead photos/videos.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'lead-media',
  'lead-media',
  true,
  104857600, -- 100 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'video/mp4', 'video/quicktime', 'video/webm']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Public can read (so emailed links resolve). service_role bypasses RLS for writes.
drop policy if exists "lead-media public read" on storage.objects;
create policy "lead-media public read" on storage.objects
  for select to public
  using (bucket_id = 'lead-media');
