-- Add artist text field to events table
ALTER TABLE public.events ADD COLUMN artist TEXT;

-- Update existing events to copy artist name from artists table
UPDATE public.events
SET artist = artists.name
FROM public.artists
WHERE public.events.artist_id = public.artists.id;

-- Make artist_id nullable (it already is, but just to be sure)
ALTER TABLE public.events ALTER COLUMN artist_id DROP NOT NULL;

-- Add status column to events table
ALTER TABLE public.events ADD COLUMN status TEXT DEFAULT 'draft';

-- Update existing events to have appropriate status values
-- Any published events (is_featured = true) get 'published' status
UPDATE public.events
SET status = 'published'
WHERE is_featured = true;

-- All other events remain as 'draft' (the default value) 