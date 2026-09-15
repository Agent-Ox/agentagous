-- Outbound click logging for /go/[slug] and /go/company/[id].
--
-- Apply with the Supabase SQL editor, or `supabase db push` once the project
-- is linked. The /go routes redirect correctly without this table — they log a
-- failure and still send the visitor on — so applying it is not urgent, but no
-- clicks are recorded until it exists.

create table if not exists public.outbound_clicks (
  id          bigint generated always as identity primary key,
  slug        text not null,
  referer     text,
  user_agent  text,
  ts          timestamptz not null default now()
);

create index if not exists outbound_clicks_slug_ts_idx
  on public.outbound_clicks (slug, ts desc);

alter table public.outbound_clicks enable row level security;

-- Insert-only for anon: the site writes clicks with the publishable key, and
-- nobody can read the log back without a privileged key.
drop policy if exists "anon can insert outbound clicks" on public.outbound_clicks;
create policy "anon can insert outbound clicks"
  on public.outbound_clicks
  for insert
  to anon
  with check (true);
