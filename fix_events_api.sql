-- Copy title to the notes column for new events
UPDATE public.events SET notes = title WHERE notes IS NULL;

-- Update type definition 
-- This would need to be done in the TypeScript code
-- We already updated the database schema to add notes
-- and removed the artist_id column which was already not needed 