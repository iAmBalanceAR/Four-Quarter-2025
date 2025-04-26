create extension if not exists "uuid-ossp";

create table if not exists content_pages (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique, -- e.g. 'about', 'home', 'events', 'contact'
  seo_title text,
  seo_description text,
  main_content text,
  images jsonb, -- { "main": "url", "additional": ["url1", "url2"] }
  updated_at timestamp with time zone default now()
); 